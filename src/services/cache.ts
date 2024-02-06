import { redisClient1 as cacheClient } from '../config';
import { enums, interfaces } from '../utils';
import logger from './logger';

const setKey = async (key: string, value: string): Promise<boolean | null> => {
    let res: string | null = null;
    try {
        if (cacheClient.isReady) {
            res = await cacheClient.set(key.toLocaleLowerCase(), value);
        } 
    } catch(err) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_SET_OBJECT + <string>JSON.stringify(err));
    }
    return Boolean(res);
}

const getProfileCache = async (key: string) => {
    let value: interfaces.ICacheProfileValue | null = null;
    try {
        if (cacheClient.isReady) {
            const tempValue = await cacheClient.get(key);
            value = tempValue ? JSON.parse(tempValue) : null;
        }
    } catch(err) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_GET_PROFILE + JSON.stringify(err));
    }
    return value;
}

const getKey = async (key: string): Promise<string | null> => {
    let value: string | null = null;
    try {
        if (cacheClient.isReady) {
            value = await cacheClient.get(key);
        }
    } catch(err) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_GET_OBJECT + JSON.stringify(err));
    }
    return value;
}

export { getProfileCache, setKey, getKey }

