import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const upsertPinnedPost = async (userId: number, metadata: interfaces.IFileMetadata): Promise<boolean | undefined> => {
    let query1Start = 'INSERT INTO file_metadata(user_id';
    let query1End = ') VALUES ($1';
    let count = 2;
    const params1: (string | undefined | number)[] = [userId];
    for(const key in metadata) {
        query1Start += `, ${key}`;
        query1End += `, $${count}`;
        params1.push(metadata[key]);
        count += 1;
    }
    const query1 = query1Start + query1End + ') RETURNING file_metadata.id';
    const query2 = 'SELECT id FROM post WHERE user_id=$1 AND pinned=true AND deleted_at IS NULL';
    const params2 = [userId]
    const query3 = `UPDATE post SET location=$1, file_metadata_id=$3, type=$4 WHERE id=$2 RETURNING post.id`;
    const params3 = [metadata.location];
    const query4 = `INSERT INTO post(user_id, location, pinned, file_metadata_id, type) VALUES ($1, $2, $3, $4, $5) RETURNING post.id`;
    const params4 = [userId, metadata.location, true];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        const insertFileRes = await client.query(query1, params1);
        if (!insertFileRes?.rows?.length) {
            throw new Error();
        } 
        const postRes = await client.query(query2, params2);
        if (postRes.rows.length) {
            const postId = postRes.rows[0].id;
            params3.push(postId, insertFileRes.rows[0].id, metadata.mimetype.split('/')[0]);
            res = await client.query(query3, params3);
        } else {
            params4.push(insertFileRes.rows[0].id, metadata.mimetype.split('/')[0]);
            res = await client.query(query4, params4);
        }
        await client.query('COMMIT');
    } catch(err) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
        const post = res.rows[0];
        return true;
    }
}

export default upsertPinnedPost;