import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const addUrl = async (addImageMetadataObj: interfaces.IAddImageMetadata): Promise<boolean> => {
    const query = 'INSERT INTO image_metadata(filename, link, , mimetype, profile_id, size) VALUES($1, $2, $3, $4, $5)';
    const params = [...Object.keys(addImageMetadataObj).sort().map(o => addImageMetadataObj[o])];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        res = await client.query(query, params);
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }   
    return Boolean(res?.rowCount);
}

export default addUrl;