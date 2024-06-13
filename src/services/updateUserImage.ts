import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const updateUserImage = async (userId: number, metadata: interfaces.IFileMetadata): Promise<boolean> => {
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
    const query2 = `UPDATE profile SET profile_picture=$2, profile_picture_metadata_id=$3 WHERE user_id=$1 AND deleted_at IS NULL`;
    const params2 = [userId, metadata.location];
    const client = await getDbClient();
    let res = false;
    try {
        await client.query('BEGIN');
        const insertFileRes = await client.query(query1, params1);
        if (!insertFileRes?.rows?.length) {
            throw new Error();
        } 
        params2.push(insertFileRes.rows[0].id);
        await client.query(query2, params2);
        await client.query('COMMIT');
        res = true;
    } catch(err) {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }  
    return res;
}

export default updateUserImage;