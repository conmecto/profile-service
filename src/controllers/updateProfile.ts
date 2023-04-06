import { interfaces, validationSchema, constants, enums } from '../utils';
import { CustomError, updateUserProfile } from '../services';

const updateProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    const userId: number = req._user?.id;
    const paramsUserId = Number(req.params.userId);
    if (isNaN(paramsUserId) || userId !== paramsUserId) {
        throw new CustomError(enums.StatusCodes.UNAUTHORIZED, enums.Errors.UNAUTHORIZED_REQUEST);
    }
    const profileUpdateObj = <interfaces.IProfileUpdateObject>req.body;
    await validationSchema.profileUpdateSchema.validateAsync(profileUpdateObj);    
    const res = await updateUserProfile(userId, profileUpdateObj);
    if (!res) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }
    return {
        message: constants.PROFILE_UPDATED
    }
}

export default updateProfile;