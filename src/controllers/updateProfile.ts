import { interfaces, validationSchema, constants, enums } from '../utils';
import { CustomError, updateUserProfile, setKey, getProfileCache, checkUserName } from '../services';

const updateProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    const userId = Number(req.params['userId']);
    const res = {
        message: constants.PROFILE_UPDATED
    }
    if (!Object.keys(req.body).length) {
        return res;
    }
    const profileUpdateObj = <interfaces.IProfileUpdateObject>req.body;
    await validationSchema.profileUpdateSchema.validateAsync(profileUpdateObj);  
    if (profileUpdateObj.name) {
        profileUpdateObj.name = profileUpdateObj.name.toLowerCase();
    } 
    if (profileUpdateObj.userName) {
        const checkDuplicateUserName = await checkUserName(userId, profileUpdateObj.userName);
        if (checkDuplicateUserName) {
            throw new CustomError(enums.StatusCodes.CONFLICT, enums.Errors.CONLFIC_USER_NAME, enums.ErrorCodes.CONLFIC_USER_NAME);
        }
    }
    //const profileCacheKey = `profile:user:${userId}`;
    const profileUpdateRes = await updateUserProfile(userId, profileUpdateObj);
    if (!profileUpdateRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    // if (profileCache) {
    //     await setKey(profileCacheKey, JSON.stringify({ ...profileCache, ...profileUpdateObj }));
    // }
    return res;
}

export default updateProfile;