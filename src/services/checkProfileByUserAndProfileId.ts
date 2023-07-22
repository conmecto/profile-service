import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const checkProfileByUserAndProfileId = async (id: number, userId: number): Promise<interfaces.ICheckProfileResponse | null> => {
    const query = 'SELECT id, user_id FROM profile WHERE id=$1 AND user_id=$2';
    const params = [id, userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_CHECK_PROFILE_BY_USER_AND_PROFILE_ID_ERROR + err);
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows?.length ? res.rows[0] : null;
}

export default checkProfileByUserAndProfileId;