import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, reportUserPost } from '../services';

const reportPost = async (req: interfaces.IRequestObject) => {
    await validationSchema.reportPostParamSchema.validateAsync(req.params);
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    const postId = Number(req.params['postId']);
    const res = await reportUserPost(postId, user.userId);
    if (!res) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.POST_NOT_FOUND, enums.ErrorCodes.POST_NOT_FOUND);
    }
    return res;
}

export default reportPost;