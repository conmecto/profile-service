import { QueryResult } from 'pg';
import { omit } from 'lodash';
import { getDbClient } from '../config';
import { enums, interfaces } from '../utils';

const getProfiles = async (filterObj: interfaces.ISearchProfileFilterObj): Promise<interfaces.IGetMultipleProfiles[]> => {
    const querySplit = ['SELECT id, user_id, user_name, name, profile_picture FROM profile WHERE country=$1 '];
    const params = [filterObj.country, (filterObj.page-1) * filterObj.perPage, filterObj.perPage];
    if (filterObj.city) {
      querySplit.push('AND city=$5 ');
      params.push(filterObj.city);
    }
    if (filterObj.q) {
      querySplit.push(`AND (user_name ILIKE $4 OR name ILIKE $4) `);
      params.push('%' + filterObj.q + '%');
    }
    querySplit.push('OFFSET $2 LIMIT $3');
    const query = querySplit.join('');
    const client = await getDbClient();
    let res: QueryResult | null = null;
    try {
        res = await client.query(query, params);
    } catch(err) {
        throw err;
    } finally {
        client.release();
    }  
    return res?.rows ? res.rows.map(profile => {
        return <interfaces.IGetMultipleProfiles>omit({
            ...profile,
            userId: profile.user_id,
            userName: profile.user_name,
            profilePicture: profile.profile_picture,
        }, ['user_id', 'user_name', 'profile_picture']);
    }) : [];
}

export default getProfiles;