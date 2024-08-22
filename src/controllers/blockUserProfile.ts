import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, blockProfile } from '../services';

const blockUserProfile = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.params?.userId);
    const blockedUserId = Number(req.body?.blockedUserId);
    await validationSchema.blockParamSchema.validateAsync({ userId, blockedUserId });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    await blockProfile(userId, blockedUserId);
    return {
        message: 'User blocked successfully'
    };
}

export default blockUserProfile;