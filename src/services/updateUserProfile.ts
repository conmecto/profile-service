import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const updateUserProfile = async (userId: number, profileObj: interfaces.IProfileUpdateObject) => {
    const keys = Object.keys(profileObj).map((key, index) => `${key}=$${index+2}`).join(',');
    const query = `
        UPDATE profile SET ${keys}
        WHERE user_id=$1 AND deleted_at IS NULL
    `;
    const params = [userId, ...Object.values(profileObj)];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return Boolean(res?.rowCount);
}

export default updateUserProfile;