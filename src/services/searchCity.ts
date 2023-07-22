import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { enums } from '../utils';
 
const searchCity = async (city: string): Promise<boolean> => {
    const query = 'SELECT id FROM city WHERE name=$1';
    const params = [city];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_SEARCH_CITIES_ERROR + err);
        throw err;
    } finally {
        client.release();
    } 
    return Boolean(res?.rows.length);
}

export default searchCity;