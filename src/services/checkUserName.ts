import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';
 
const checkUserName = async (userName: string, profileId: number): Promise<boolean> => {
    const query = 'SELECT id FROM profile WHERE user_name=$1 AND id!=$2';
    const params = [userName, profileId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_SEARCH_USER_NAME_ERROR + err);
        throw err;
    } finally {
        client.release();
    } 
    return Boolean(res?.rows.length);
}

export default checkUserName;