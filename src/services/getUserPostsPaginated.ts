import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { interfaces, enums } from '../utils';
import { getDbClient } from '../config';

const getUserPostsPaginated = async (userId: number, paginationOptions: interfaces.IPaginationOptions): Promise<interfaces.IPostDetail[]> => {
    const query = 'SELECT * FROM post WHERE user_id=$1 AND deleted_at is NULL ORDER BY created_at DESC OFFSET $2 LIMIT $3';
    const skip = (paginationOptions.page - 1) * paginationOptions.perPage;
    const params = [userId, skip, paginationOptions.perPage];
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
                }, ['user_id', 'file_metadata_id', 'created_at', 'updated_at', 'deleted_at', 'reported_by']
            );
        });
        return <interfaces.IPostDetail[]>posts;
    }
    return [];
}

export default getUserPostsPaginated;