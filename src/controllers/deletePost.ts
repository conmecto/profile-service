import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, deleteUserPost } from '../services';

const deletePost = async (req: interfaces.IRequestObject) => {
    await validationSchema.deletePostParamSchema.validateAsync(req.params);
    const userId = Number(req.params['userId']);
    const postId = Number(req.params['postId']);
    const res = await deleteUserPost(postId, userId);
    if (!res) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.POST_NOT_FOUND, enums.ErrorCodes.POST_NOT_FOUND);
    }
    return res;
}

export default deletePost;