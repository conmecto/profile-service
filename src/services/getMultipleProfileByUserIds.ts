import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getMultipleProfileByUserIds = async (userIds: number[]): Promise<interfaces.IGetMultipleProfiles[]> => {
    const keys = userIds.map((id, index) => `$${index+1}`).join(',');
    let query = `SELECT id, user_id, name, profile_picture FROM profile WHERE user_id IN (${keys})`;
    const params = userIds;
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows ? res.rows.map(profile => {
        return <interfaces.IGetMultipleProfiles>omit({
            ...profile,
            userId: profile.user_id,
            profilePicture: profile.profile_picture,
        }, ['user_id', 'profile_picture']);
    }) : [];
}

export default getMultipleProfileByUserIds;