import { dbSource } from '../config';
import { interfaces } from '../utils';

const getProfileByUserId = async (userId: number) => {
    const query = `select * from profile where userId=$1`;
    const params = [userId];
    const profile: interfaces.IProfileObject | undefined = await dbSource.query(query, params);
    return profile;
}

export default getProfileByUserId;