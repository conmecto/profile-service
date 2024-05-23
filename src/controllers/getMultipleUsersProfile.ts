import { interfaces, validationSchema } from '../utils';
import { getMultipleProfileByUserIds } from '../services';

const getMultipleUsersProfile = async (req: interfaces.IRequestObject) => {
    await validationSchema.multipleUsersProfileSchema.validateAsync(req.query);
    const userIdsString = <string>req.query.userIds;
    const userIds = userIdsString?.split(',');
    //Add cache response if query is slow
    const profiles = await getMultipleProfileByUserIds(userIds.map(userId => Number(userId)));
    const profilesRes: { [key: number]: interfaces.IGetMultipleProfiles } = {};
    profiles.forEach(profile => {
        profilesRes[profile.userId] = profile;
    });
    return {
        data: profilesRes
    };
}

export default getMultipleUsersProfile;