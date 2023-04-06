import { dbSource } from '../config';
import { interfaces } from '../utils';

const updateUserProfile = async (userId: number, profileObj: interfaces.IProfileUpdateObject): Promise<boolean> => {
    let query = `update profile set`;
    let count = 0;
    const params: (string | undefined | number)[] = [];
    const temp: string[] = [];
    for(let key in profileObj) {
        temp.push(` ${key}=$${++count}`);
        params.push(profileObj[key as keyof interfaces.IProfileUpdateObject]);
    }
    let res = false;
    if (count > 0) {
        query = query + temp.join(',') + ` where userId=$${++count} and deleted_at is null`;
        params.push(userId);
        res = await dbSource.query(query, params);
    }
    return res ? true : false;
}

export default updateUserProfile;