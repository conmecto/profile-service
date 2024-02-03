import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';
 
const searchCity = async (city: string): Promise<boolean> => {
    const query = 'SELECT id FROM city WHERE name=$1';
    const params = [city];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    } 
    return Boolean(res?.rows.length);
}

export default searchCity;