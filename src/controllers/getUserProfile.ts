import { interfaces, constants, enums, validationSchema, helpers } from '../utils';
import { CustomError, getProfile, getProfileCache, setKey } from '../services';

const getUserProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGetProfileResponse> => {
    const userId = Number(req.user.id);
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    const profileId = Number(req.params['id']);
    let profile = await getProfileCache(`profile:user:${userId}`);
    if (!profile) {
        profile = await getProfile(profileId, userId);
    }
    if (!profile) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.PROFILE_NOT_FOUND, enums.ErrorCodes.PROFILE_NOT_FOUND);
    }
    return profile;
}

export default getUserProfile;