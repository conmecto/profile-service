import { redisClient1 as pubClient, redisClient2 as subClient } from '../config';
import { Environments, helpers, enums } from '../utils';
import addProfile from './addProfile';
import removeProfile from './removeProfile';
import logger from './logger';

const handleAddProfileMessage = async (message: any, channel: string) => {
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
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_CHANNEL_MESSAGE_RECEIVE_ERROR + errorString);
        await pubClient.publish(Environments.redis.channels.userCreatedProfileError, message);
    }
}

const handleAccountRemovedMessage = async (message: any, channel: string) => {
    try {
        const { userId } = JSON.parse(message);
        if (Environments.redis.channels.userAccountRemoved === channel && userId) {
            await removeProfile(Number(userId));
        }
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('Profile Service: ' + enums.PrefixesForLogs.REDIS_CHANNEL_ACCOUNT_REMOVED_MESSAGE_ERROR + errorString);
    }
}

export { 
    handleAddProfileMessage, handleAccountRemovedMessage
}