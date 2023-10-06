import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const createNewPost = async (userId: number, metadata: interfaces.IFileMetadata): Promise<interfaces.IPostDetail | undefined> => {
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
    const query2 = `INSERT INTO post(user_id, location, file_metadata_id, type) VALUES ($1, $2, $3, $4) RETURNING post.*`;
    const params2 = [userId, metadata.location];

    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        await client.query('BEGIN');
        console.log(query1);
        console.log(params1);
        const insertFileRes = await client.query(query1, params1);
        if (!insertFileRes?.rows?.length) {
            throw new Error();
        } 
        params2.push(insertFileRes.rows[0].id, metadata.mimetype.split('/')[0]);
        console.log(query2);
        console.log(params2);
        res = await client.query(query2, params2);
        await client.query('COMMIT');
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_CREATE_POST_ERROR + err);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
        const post = res.rows[0];
        return <interfaces.IPostDetail>omit({
            ...post,
            userId: post.user_id,
            fileMetadataId: post.file_metadata_id,
            createdAt: post.created_at,
            updatedAt: post.updated_at,
            deletedAt: post.deleted_at,
            }, ['user_id', 'file_metadata_id', 'created_at', 'updated_at', 'deleted_at']
        );
    }
}

export default createNewPost;