import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, addPostReaction } from '../services';

const updatePostReaction = async (req: interfaces.IRequestObject) => {
    const postId = Number(req.params.postId)
    await validationSchema.postReactionParamSchema.validateAsync({ postId });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    const userId = Number(user?.userId);
    await addPostReaction(userId, postId);
    return {
        message: 'Post reaction added successfully'
    };
}

export default updatePostReaction;