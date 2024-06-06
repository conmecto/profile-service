import { interfaces, validationSchema, enums } from '../utils';
import { getFeedByUserId, CustomError } from '../services';

const getUserFeed = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.params?.userId);
    const page = Number(req.query?.page);
    const perPage = Number(req.query?.perPage);
    await validationSchema.getFeedSchema.validateAsync({ userId, page, perPage });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    const feed = await getFeedByUserId({ userId, page, perPage });
    return { 
        feed,
        hasMore: feed?.length ? feed[0].hasMore : false
    }
}

export default getUserFeed;