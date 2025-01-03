import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';
import { enums } from '../utils';

const reportUserPost = async (postId: number, userId: number) => {
    const date = moment().toISOString(true);
    const query = 'UPDATE post SET reported=true, reported_by=$2, reported_at=$3 WHERE id=$1';
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

export default reportUserPost;