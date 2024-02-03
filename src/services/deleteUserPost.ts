import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { enums } from '../utils';

const deleteUserPost = async (postId: number, userId: number): Promise<boolean> => {
    const date = moment().toISOString(true);
    const query = 'UPDATE post SET deleted_at=$3 WHERE id=$1 AND user_id=$2 AND deleted_at IS NULL';
    const params = [postId, userId, date];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return Boolean(res.rowCount);
}

export default deleteUserPost;