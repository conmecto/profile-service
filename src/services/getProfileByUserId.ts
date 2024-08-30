import { QueryResult } from 'pg';
import { getDbClient } from '../config';
import { interfaces, helpers } from '../utils';

const getProfileByUserId = async (userId: number) => {
    const query = `
      SELECT id, name, user_name, description, user_id, profile_picture, 
      work, university, city, country, 
      CASE 
        WHEN dob IS NULL THEN NULL
        ELSE EXTRACT(YEAR FROM AGE(dob))
      END AS age 
      FROM profile 
      WHERE user_id=$1 AND deleted_at IS NULL
    `;
    const params = [userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
      const profile = res.rows[0];
      return helpers.formatDbQueryResponse<interfaces.IGetProfileResponse>(profile);
    }
    return null;
}

export default getProfileByUserId;