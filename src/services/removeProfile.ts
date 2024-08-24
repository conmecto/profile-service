import { QueryResult } from 'pg';
import moment from 'moment';
import { getDbClient } from '../config';

const removeProfile = async (userId: number) => {
    const query1 = `
        UPDATE profile 
        SET deleted_at=$2 
        WHERE user_id=$1 AND deleted_at IS NULL
        RETURNING profile.id
    `;
    const query2 = `
        UPDATE post 
        SET deleted_at=$2 
        WHERE user_id=$1 AND deleted_at IS NULL
    `;
    let res: QueryResult | null = null;
    const client = await getDbClient();
    const params = [userId, moment().toISOString(true)];
    try {
        await client.query('BEGIN');
        res = await client.query(query1, params);
        await client.query(query2, params);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK')
        throw err;
    } finally {
        client.release();
    }   
    return Boolean(res?.rowCount);
}

export default removeProfile;