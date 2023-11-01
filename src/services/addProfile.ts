import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const addProfile = async (createProfileObject: interfaces.ICreateProfileObject): Promise<interfaces.IAddProfileResponse | null> => {
    const query = 'INSERT INTO profile(age, name, user_id, user_name, city, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING profile.id';
    const { age, name, userId, userName, city, country } = createProfileObject;
    const params = [age, name, userId, userName, city, country];
    let res: QueryResult | null = null;
    const client = await getDbClient();
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch (err) {
        console.error(enums.PrefixesForLogs.DB_INSERT_PROFILE_ERROR + err);
        throw err;
    } finally {
        client.release();
    }
    const check = res?.rows?.length ? { 
        profileId: <number>res.rows[0].id
    } : null;
    return check;
}

export default addProfile;