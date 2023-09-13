import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const getMultipleProfileByUserIds = async (userIds: number[]): Promise<interfaces.IGetMultipleProfiles[]> => {
    const query = `SELECT id, user_id, user_name, name, image_1 FROM profile WHERE user_id IN (${userIds.join(',')})`;
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        res = await client.query(query, []);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_GET_MULTIPLE_PROFILES_BY_USER_IDS_ERROR + err);
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows ? res.rows.map(profile => {
        return <interfaces.IGetMultipleProfiles>omit({
            ...profile,
            userId: profile.user_id,
            userName: profile.user_name,
            image1: profile.image_1,
        }, ['user_id', 'user_name', 'image_1']);
    }) : [];
}

export default getMultipleProfileByUserIds;