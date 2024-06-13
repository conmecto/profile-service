import moment from 'moment';
import { getDbClient } from '../config';

const addPostReaction = async (userId: number, postId: number) => {
    const reactedAt = moment().toISOString(true);
    const params1 = [userId, postId, true, reactedAt];
    const query1 = `
        INSERT INTO post_view (user_id, post_id, reacted, reacted_at)
        VALUES ($1, $2, $3, $4)
    `;
    const query2 = `
        UPDATE post
        SET react_count=react_count+1
        WHERE id=$1
    `;
    const params2 = [postId];
    const client = await getDbClient();
    try {
        await client.query('BEGIN');
        await client.query(query1, params1);
        await client.query(query2, params2);
        await client.query('COMMIT');
    } catch(err) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    } 
}

export default addPostReaction;