import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { interfaces, enums } from '../utils';
import { getDbClient } from '../config';

const getUserPostsPaginated = async (userId: number, paginationOptions: interfaces.IPaginationOptions): Promise<interfaces.IPostDetail[]> => {
    const query = `
        WITH total_count AS (
            SELECT count(*) AS count 
            FROM post 
            WHERE user_id=$1 AND deleted_at is NULL
        ),
        paginated_results AS (
            SELECT *, (SELECT count > $3 FROM total_count) AS has_more
            FROM post 
            WHERE user_id=$1 AND deleted_at is NULL 
            ORDER BY created_at DESC 
            OFFSET $2 
            LIMIT $4
        )
        SELECT * FROM paginated_results
    `;
    const skip = (paginationOptions.page - 1) * paginationOptions.perPage;
    const countSkip = paginationOptions.page * paginationOptions.perPage;
    const params = [userId, skip, countSkip, paginationOptions.perPage];
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
                fileMetadataId: post.file_metadata_id,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                deletedAt: post.deleted_at,
                hasMore: post.has_more
                }, ['user_id', 'file_metadata_id', 'created_at', 'updated_at', 'deleted_at', 'reported_by', 'has_more', 'reported_at']
            );
        });
        return <interfaces.IPostDetail[]>posts;
    }
    return [];
}

export default getUserPostsPaginated;