import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const updateUserProfile = async (profileId: number, userId: number, profileObj: interfaces.IProfileUpdateObject): Promise<boolean> => {
    let query = `UPDATE profile SET`;
    let count = 2;
    const params: (string | undefined | number)[] = [profileId, userId];
    const keysSet: string[] = [];
    for(const key in profileObj) {
        let actualKey = key;
        if (key === 'snapId') {
            actualKey = 'snap_id';
        } else if (key === 'igId') {
            actualKey = 'ig_id';
        }
        keysSet.push(` ${actualKey}=$${++count}`);
        params.push(profileObj[key]);
    }
    query = query + keysSet.join(',') + ` WHERE id=$1 AND user_id=$2`;
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_UPDATE_PROFILE_ERROR + err);
        throw err;
    } finally {
        client.release();
    }  
    return Boolean(res?.rowCount);
}

export default updateUserProfile;