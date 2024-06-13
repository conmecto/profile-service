import { interfaces, validationSchema, enums } from '../utils';
import { CustomError, updateViewedPosts } from '../services';

const markPostsViewed = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.params.userId);
    const postIds = req.body.postIds?.map(id => Number(id));
    await validationSchema.markPostsViewedParamSchema.validateAsync({ userId, postIds });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    await updateViewedPosts(userId, postIds);
    return {
        message: 'Posts view status updated successfully'
    };
}

export default markPostsViewed;