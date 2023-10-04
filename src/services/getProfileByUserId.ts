import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const getProfileByUserId = async (userId: number): Promise<interfaces.IGetProfileResponse | null> => {
    const query = 'SELECT * FROM profile WHERE user_id=$1';
    const params = [userId];
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        console.log(query);
        console.log(params);
        res = await client.query(query, params);
    } catch(err) {
        console.error(enums.PrefixesForLogs.DB_GET_PROFILE_BY_USER_ID_ERROR + err);
        throw err;
    } finally {
        client.release();
    }  
    if (res?.rows?.length) {
      const profile = res.rows[0];
      return <interfaces.IGetProfileResponse>omit({
        ...profile,
        snapId: profile.snap_id,
        igId: profile.ig_id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePicture: profile.profile_picture,
      }, ['user_id', 'snap_id', 'ig_id', 'user_name', 'profile_picture']);
    }
    return null;
}

export default getProfileByUserId;