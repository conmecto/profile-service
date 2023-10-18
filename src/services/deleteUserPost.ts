import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { enums } from '../utils';

const deleteUserPost = async (postId: number, userId: number): Promise<boolean> => {
    const date = moment().toISOString(true);
    const query = 'UPDATE post SET deleted_at=$3 WHERE id=$1 AND user_id=$2';
    const params = [postId, userId, date];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_DELETE_POST_ERROR + err);
        throw err;
    } finally {
        client.release();
    }  
    return Boolean(res.rowCount);
}

export default deleteUserPost;