import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';
 
const checkUserName = async (userId: number, userName: string): Promise<boolean> => {
    const query = 'SELECT id FROM profile WHERE user_name=$1 AND user_id<>$2 AND deleted_at is NULL';
    const params = [userName, userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    } 
    return Boolean(res?.rows.length);
}

export default checkUserName;