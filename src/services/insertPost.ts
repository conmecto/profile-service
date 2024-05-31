import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces } from '../utils';

const insertPost = async (userId: number, metadata: interfaces.IFileMetadata, match: boolean, caption: string) => {
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
    const query2 = `
        INSERT INTO 
        post(user_id, location, match, type, caption, file_metadata_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING post.id
    `;
    const params2 = [userId, metadata.location, match, 'image', caption];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        const insertFileRes = await client.query(query1, params1);
        if (!insertFileRes?.rows?.length) {
            throw new Error();
        } 
        params2.push(insertFileRes.rows[0].id);
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