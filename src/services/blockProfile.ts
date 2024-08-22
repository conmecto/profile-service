import { QueryResult } from 'pg';
import { getDbClient } from '../config';

const blockProfile = async (userId: number, blockedUserId: number) => {
    const query = 'INSERT INTO profile_block(user_id_1, user_id_2) VALUES ($1, $2)';
    const params = [userId, blockedUserId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }
}

export default blockProfile;