import { redisClient1 as pubClient, redisClient2 as subClient } from '../config';
import { Environments, helpers, enums } from '../utils';
import addProfile from './addProfile';
import { setKey } from './cache';

export const handleAddProfileMessage = async (message: any, channel: string) => {
    try {
        const { dob, name, id: userId } = JSON.parse(message);
        if (Environments.redis.channels.userCreatedProfile === channel && dob && name && userId) {
            const age = helpers.getAge(dob);
            const userName = helpers.generateUserName(name);
            const insertDoc = { age, name, userId, userName };
            const res = await addProfile(insertDoc);
            if (!res) {
                throw new Error();
            }
            const key = `profile:user:${userId}`;
            await setKey(key, JSON.stringify({ id: res.profileId, userId, name, age, userName }));
        }
    } catch(err) {
        console.log(enums.PrefixesForLogs.REDIS_CHANNEL_MESSAGE_RECEIVE_ERROR + err);
        await pubClient.publish(Environments.redis.channels.userCreatedProfileError, message);
    }
}