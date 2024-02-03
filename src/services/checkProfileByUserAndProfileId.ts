import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const checkProfileByUserAndProfileId = async (id: number, userId: number): Promise<interfaces.ICheckProfileResponse | null> => {
    const query = 'SELECT id, user_id FROM profile WHERE id=$1 AND user_id=$2 AND deleted_at IS NULL';
    const params = [id, userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows?.length ? res.rows[0] : null;
}

export default checkProfileByUserAndProfileId;