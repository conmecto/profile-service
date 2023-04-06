import { dbSource } from '../config';

const searchCity = async (city: string, country?: string): Promise<boolean> => {
    const query = 'select name, country from city where name=$1 and deleted_at is null';
    const params = [city];
    const res = await dbSource.query(query, params);
    if (!res || res.country !== country) {
        return false;
    }
    return true;
}

export default searchCity;