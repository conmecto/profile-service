import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const updateUserImage = async (userId: number, metadata: interfaces.IFileMetadata) => {
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
        UPDATE profile 
        SET profile_picture=$2, profile_picture_metadata_id=$3 
        WHERE user_id=$1 AND deleted_at IS NULL
    `;
    const params2 = [userId, metadata.key];
    const client = await getDbClient();
    let res = false;
    try {
        await client.query('BEGIN');
        const fileMetaRes = await client.query(query1, params1);
        if (!fileMetaRes?.rows?.length) {
            throw new Error();
        } 
        params2.push(fileMetaRes.rows[0].id);
        await client.query(query2, params2);
        await client.query('COMMIT');
        res = true;
    } catch(err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }  
    return res;
}

export default updateUserImage;