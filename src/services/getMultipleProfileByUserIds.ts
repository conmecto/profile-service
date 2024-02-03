import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const getMultipleProfileByUserIds = async (userIds: number[]): Promise<interfaces.IGetMultipleProfiles[]> => {
    const query = `SELECT id, user_id, user_name, name, profile_picture FROM profile WHERE user_id IN (${userIds.join(',')})`;
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, []);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows ? res.rows.map(profile => {
        return <interfaces.IGetMultipleProfiles>omit({
            ...profile,
            userId: profile.user_id,
            userName: profile.user_name,
            profilePicture: profile.profile_picture,
        }, ['user_id', 'user_name', 'profile_picture']);
    }) : [];
}

export default getMultipleProfileByUserIds;