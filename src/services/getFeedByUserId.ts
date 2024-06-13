import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getFeedByUserId = async (data: interfaces.IGetFeedPayload) => {
    const { userId, page, perPage } = data;
    const query = `
        WITH total_count AS (
            SELECT count(id) AS count
            FROM post p
            WHERE p.user_id<>$1 AND (p.reported_by<>$1 OR p.reported_by IS NULL) AND p.deleted_at IS NULL 
        ),
        paginated_results AS (
            SELECT 
            p.id, p.user_id, p.location, p.type, p.match, p.caption, p.created_at, p.react_count,
            pr.profile_picture, pr.name, (SELECT count > $4 FROM total_count) AS has_more, pv.reacted AS reacted 
            FROM post p 
            LEFT JOIN profile pr ON pr.user_id=p.user_id
            LEFT JOIN post_view pv ON pv.user_id=$1 AND pv.post_id=p.id 
            WHERE p.user_id<>$1 AND (p.reported_by<>$1 OR p.reported_by IS NULL) AND p.deleted_at IS NULL 
            ORDER BY p.created_at DESC 
            OFFSET $2 
            LIMIT $3
        )
        SELECT * FROM paginated_results
    `;
    const skip = (page - 1) * perPage;
    const countSkip = page * perPage;
    const params = [userId, skip, perPage, countSkip];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
        const posts = res.rows.map(post => {
            return omit({
                ...post,
                userId: post.user_id,
                createdAt: post.created_at,
                profilePicture: post.profile_picture,
                hasMore: post.has_more,
                reactCount: post.react_count
                }, ['user_id', 'created_at', 'profile_picture', 'has_more', 'react_count']
            );
        });
        return <interfaces.IPostDetail[]>posts;
    }
    return [];
}

export default getFeedByUserId;