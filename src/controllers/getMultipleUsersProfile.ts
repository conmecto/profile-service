import { interfaces, validationSchema } from '../utils';
import { getMultipleProfileByUserIds } from '../services';

const getMultipleUsersProfile = async (req: interfaces.IRequestObject): Promise<interfaces.IGetMultipleProfiles[]> => {
    await validationSchema.multipleUsersProfileSchema.validateAsync(req.query);
    const userIdsString = <string>req.query.userIds;
    const userIds = userIdsString?.split(',');
    //Add cache response if query is slow
    const profiles = await getMultipleProfileByUserIds(userIds.map(userId => Number(userId)));
    return profiles;
}

export default getMultipleUsersProfile;