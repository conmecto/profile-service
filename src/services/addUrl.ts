import { randomInt } from 'crypto';
import { dbSource } from '../config';
import { interfaces, helpers } from '../utils';

const addUrl = async (url: string, userId: number): Promise<boolean> => {
    const query = 'insert into url(link, user_id) values($1, $2)';
    const params = [url, userId];
    const res = await dbSource.query(query, params);
    return res ? true : false;
}

export default addUrl;