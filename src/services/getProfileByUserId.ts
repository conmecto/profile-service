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
        image1: profile.image_1,
        image2: profile.image_2,
        image3: profile.image_3,
        image4: profile.image_4,
        image5: profile.image_5,
      }, ['user_id', 'snap_id', 'ig_id', 'user_name', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5']);
    }
    return null;
}

export default getProfileByUserId;