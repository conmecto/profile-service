import { interfaces, validationSchema, constants, enums, helpers } from '../utils';
import { CustomError, updateUserProfile, setKey, getProfileCache, searchCity } from '../services';

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
            throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.CITY_NOT_FOUND);
        }
    }
    const profileUpdateRes = await updateUserProfile(profileId, userId, profileUpdateObj);
    if (!profileUpdateRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }
    const profileCacheKey = helpers.buildProfileCacheKey(profileId, userId);
    const profileCache = await getProfileCache(profileCacheKey);
    const profileCacheUpdateValue = profileCache ? JSON.stringify({ ...profileCache, ...profileUpdateObj }) : JSON.stringify(profileCache);
    await setKey(profileCacheKey, profileCacheUpdateValue);
    return res;
}

export default updateProfile;