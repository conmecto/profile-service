import { Worker, Job } from 'bullmq';
import { Environments } from '../utils';
import { 
    logger,
    handleAddProfileMessage
} from '../services';

const createUserProfileWorker = new Worker('createUserProfileQueue', async (job: Job) => {
    const res = await handleAddProfileMessage(job.data);
    return res;
}, {
    connection: {
        host: Environments.redis.host,
        port: Environments.redis.port,
        username: Environments.redis.username,
        password: Environments.redis.password
    }
});

createUserProfileWorker.on('failed', (job: Job | undefined, error: Error) => {
    const failedError = JSON.stringify({
        message: error?.message,
        stack: error?.stack 
    });
    logger('Create User Profile Worker Failed: ' + failedError);
});

createUserProfileWorker.on('error', err => {
    const error = JSON.stringify({
        message: err?.message,
        stack: err?.stack 
    });
    logger('Create User Profile Worker Error: ' + error);
});

export default createUserProfileWorker;