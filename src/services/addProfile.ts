import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, enums } from '../utils';

const addProfile = async (createProfileObject: interfaces.ICreateProfileObject): Promise<interfaces.IAddProfileResponse | null> => {
    const query = 'INSERT INTO profile(age, name, user_id) VALUES ($1, $2, $3) RETURNING profile.id';
    const params = [createProfileObject.age, createProfileObject.name, createProfileObject.userId];
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