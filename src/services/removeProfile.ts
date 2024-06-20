import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';

const removeProfile = async (userId: number) => {
    const query = `
        UPDATE profile 
        SET deleted_at=$2 
        WHERE user_id=$1 AND deleted_at IS NULL
        RETURNING profile.id
    `;
    let res: QueryResult | null = null;
    const client = await getDbClient();
    const params = [userId, moment().toISOString(true)];
    try {
        res = await client.query(query, params);
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }   
    return Boolean(res?.rowCount);
}

export default removeProfile;