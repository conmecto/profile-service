import { interfaces, validationSchema, constants, enums, helpers } from '../utils';
import { CustomError, updateUserProfile, setKey, getProfileCache, searchCity, checkUserName } from '../services';

const updateProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    const userId = Number(req.user.id);
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    const profileId = Number(req.params['id']);
    const res = {
        message: constants.PROFILE_UPDATED
    }
    if (!Object.keys(req.body).length) {
        return res;
    }
    const profileUpdateObj = <interfaces.IProfileUpdateObject>req.body;
    await validationSchema.profileUpdateSchema.validateAsync(profileUpdateObj);    
    if (profileUpdateObj.location) {
        const checkCity = await searchCity(profileUpdateObj.location);
        if (!checkCity) {
            throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.CITY_NOT_FOUND, enums.ErrorCodes.CITY_NOT_FOUND);
        }
    }
    if (profileUpdateObj.userName) {
        const checkDuplicateUserName = await checkUserName(profileUpdateObj.userName, profileId);
        if (checkDuplicateUserName) {
            throw new CustomError(enums.StatusCodes.CONFLICT, enums.Errors.CONLFIC_USER_NAME, enums.ErrorCodes.CONLFIC_USER_NAME);
        }
    }
    const profileUpdateRes = await updateUserProfile(profileId, userId, profileUpdateObj);
    if (!profileUpdateRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    const profileCacheKey = `profile:user:${userId}`;
    const profileCache = await getProfileCache(profileCacheKey);
    const profileCacheUpdateValue = profileCache ? JSON.stringify({ ...profileCache, ...profileUpdateObj }) : JSON.stringify(profileCache);
    await setKey(profileCacheKey, profileCacheUpdateValue);
    return res;
}

export default updateProfile;