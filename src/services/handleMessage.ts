import { Environments, helpers, enums } from '../utils';
import addProfile from './addProfile';
import removeProfile from './removeProfile';
import logger from './logger';

const handleAddProfileMessage = async (payload: any) => {
    const { name, id: userId, country } = payload;
    const userName = helpers.generateUserName(name);
    const insertDoc = { name, userId, userName, country };
    const res = await addProfile(insertDoc);
    if (!res) {
        throw new Error('Add Profile Failed');
    }
    return res;
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
        await logger(enums.PrefixesForLogs.REDIS_CHANNEL_ACCOUNT_REMOVED_MESSAGE_ERROR + errorString);
    }
}

export { 
    handleAddProfileMessage, handleAccountRemovedMessage
}