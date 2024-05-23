import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getMultipleProfileByUserIds = async (userIds: number[]): Promise<interfaces.IGetMultipleProfiles[]> => {
    const size = userIds.length;
    let query = 'SELECT id, user_id, name, profile_picture, age, city FROM profile WHERE user_id IN (';
    for(let i = 1; i <= size; i++) {
        query += `$${i}`;
        if (i === size) {
            query += ')';
        } else {
            query += ',';
        }
    }
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