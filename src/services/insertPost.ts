import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, helpers } from '../utils';

const insertPost = async (userId: number, metadata: interfaces.IFileMetadata, match: boolean, caption: string, tags: string = '') => {
    const keys = Object.keys(metadata);
    const values = keys.map((key, index) => `$${index+2}`).join(',');
    const query1 = `
        INSERT INTO 
        file_metadata
        (user_id,${keys.join(',')})
        VALUES ($1,${values})
        RETURNING file_metadata.id
    `;
    const params1 = [userId, ...Object.values(metadata)];
    const query2 = `
        INSERT INTO 
        post(user_id, location, match, type, caption, tags, file_metadata_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING post.id
    `;
    const params2 = [userId, metadata.key, match, 'image', caption, tags];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        const fileMetaRes = await client.query(query1, params1);
        if (!fileMetaRes?.rows?.length) {
            throw new Error();
        } 
        params2.push(fileMetaRes.rows[0].id);
        res = await client.query(query2, params2);
        await client.query('COMMIT');
    } catch(err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
        const post = res.rows[0];
        return <number>post.id;
    }
}

export default insertPost;