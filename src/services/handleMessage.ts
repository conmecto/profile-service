import { redisClient1 as pubClient, redisClient2 as subClient } from '../config';
import { Environments, helpers, enums } from '../utils';
import addProfile from './addProfile';
import { setKey } from './cache';
import logger from './logger';

export const handleAddProfileMessage = async (message: any, channel: string) => {
    try {
        const { dob, name, id: userId, city, country } = JSON.parse(message);
        if (Environments.redis.channels.userCreatedProfile === channel && dob && name && userId) {
            const age = helpers.getAge(dob);
            const userName = helpers.generateUserName(name);
            const insertDoc = { age, name, userId, userName, city, country };
            const res = await addProfile(insertDoc);
            if (!res) {
                throw new Error();
            }
            // const key = `profile:user:${userId}`;
            // await setKey(key, JSON.stringify({ id: res.profileId, userId, name, age, userName, city }));
        }
    } catch(err) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_CHANNEL_MESSAGE_RECEIVE_ERROR + err?.toString());
        await pubClient.publish(Environments.redis.channels.userCreatedProfileError, message);
    }
}