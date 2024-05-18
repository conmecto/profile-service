import { interfaces, enums, validationSchema } from '../utils';
import { getUserPostsPaginated } from '../services';

const getUserPosts = async (req: interfaces.IRequestObject) => {
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    await validationSchema.userPostsQuerySchema.validateAsync(req.query);
    const userId = Number(req.params['userId']);
    const { page, perPage } = req.query;
    const sort = 'createdAt';
    const order = enums.SortOrder.DESC;
    const posts = await getUserPostsPaginated(userId, { page: Number(page), perPage: Number(perPage), sort, order });
    return {
        posts,
        hasMore: posts.length ? posts[0].hasMore : false
    }
}

export default getUserPosts;