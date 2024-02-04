import { interfaces, enums, validationSchema } from '../utils';
import { CustomError, getProfileByUserId } from '../services';

const getUserProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGetProfileResponse> => {
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    const userId = Number(req.params['userId']);
    const profile = await getProfileByUserId(userId);
    if (!profile) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.PROFILE_NOT_FOUND, enums.ErrorCodes.PROFILE_NOT_FOUND);
    }
    return profile;
}

export default getUserProfile;