import { interfaces, constants, enums } from '../utils';
import { CustomError, getProfileByUserId } from '../services';

const getUserProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
    const userId: number = req._user?.id;
    const paramsUserId = Number(req.params.userId);
    if (isNaN(paramsUserId) || userId !== paramsUserId) {
        throw new CustomError(enums.StatusCodes.UNAUTHORIZED, enums.Errors.UNAUTHORIZED_REQUEST);
    }
    //Convert this to cache
    const res = await getProfileByUserId(userId);
    if (!res) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }
    return {
        message: constants.PROFILE_UPDATED
    }
}

export default getUserProfile;