import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const getFeedByUserId = async (data: interfaces.IGetFeedPayload) => {
    const { userId, page, perPage } = data;
    const query = `
        SELECT 
        p.id, p.user_id, p.location, p.type, p.match, p.caption, p.created_at,
        pr.profile_picture, pr.name 
        FROM post p 
        LEFT JOIN profile pr ON pr.user_id=p.user_id
        WHERE (p.reported_by<>$1 OR p.reported_by IS NULL) AND p.deleted_at IS NULL 
        ORDER BY p.created_at DESC 
        OFFSET $2 
        LIMIT $3
    `;
    const params = [userId, (page - 1) * perPage, perPage];
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
                }, ['user_id', 'created_at', 'profile_picture']
            );
        });
        return <interfaces.IPostDetail[]>posts;
    }
    return [];
}

export default getFeedByUserId;