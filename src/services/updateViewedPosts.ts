import { getDbClient } from '../config';

const updateViewedPosts = async (userId: number, postIds: number[]) => {
    const params1 = [userId, ...postIds];
    const postsIndexValues = postIds.map((id, index) => `$${index + 2}`);
    const values = postsIndexValues.map(v => `($1, ${v})`).join(', ');
    const postsIndexValuesJoin = postsIndexValues.join(', ');
    const query1 = `
        INSERT INTO post_view (user_id, post_id)
        VALUES ${values}
        ON CONFLICT(user_id, post_id)
        DO UPDATE SET views=post_view.views+1 
        WHERE post_view.user_id=$1 AND post_view.post_id IN (${postsIndexValuesJoin}) AND post_view.views < 50;
    `;
    const postsIndexValuesQuery2 = postIds.map((id, index) => `$${index + 1}`).join(', ');
    const query2 = `
        WITH count_table AS (
            SELECT post_id, sum(views) as total
            FROM post_view 
            WHERE post_id IN (${postsIndexValuesQuery2})
            GROUP BY post_id
        )
        UPDATE post p
        SET view_count=ct.total
        FROM count_table ct
        WHERE p.id IN (${postsIndexValuesQuery2}) AND ct.post_id=p.id
    `;
    
    const params2 = postIds;
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

export default updateViewedPosts;