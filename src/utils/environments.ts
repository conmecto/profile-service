import { config } from 'dotenv';
import { join } from 'path';

if (process.env.NODE_ENV === 'dev') {
    const path = join(__dirname, '..', '..', '.env');
    config({ path });
}

export default {
    env: process.env.NODE_ENV || 'dev',
    secure: process.env.SECURE === 'true' || false,
    server: {
        port: process.env.PORT || 8080
    },
    proccessImageKey: process.env.PROCESS_IMAGE_KEY || '',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        database: process.env.DB_NAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        keyName: process.env.DB_KEY_NAME || ''
    },
    token: {
        publicKey: process.env.TOKEN_PUBLIC_KEY || 'TEMP_PUBLIC_KEY'
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY || 'TEMP_KEY',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'TEMP_SECRET_KEY',
        s3Region: process.env.AWS_S3_REGION || 'TEMP_REGION',
        s3ACL: process.env.AWS_S3_ACL || 'TEMP_ACL',
        s3BucketPost: process.env.AWS_S3_BUCKET_POST || 'TEMP_BUCKET_POST',
    },
    redis: {
        host: process.env.REDIS_HOST || 'REDIS_HOST',
        port: Number(process.env.REDIS_PORT) || 6379, 
        username: process.env.REDIS_USERNAME || 'REDIS_USERNAME',
        password: process.env.REDIS_PASSWORD || 'REDIS_PASSWORD',
        channels: {
            userCreatedProfile: process.env.REDIS_CHANNEL_USER_CREATED_PROFILE || 'user-created-profile', 
            userCreatedProfileError: process.env.REDIS_CHANNEL_USER_CREATED_PROFILE_ERROR || 'user-created-profile-error', 
            logging: process.env.REDIS_CHANNEL_LOGGING || 'logging-channel',
            userAccountRemoved: 'user-account-removed'
        },
        connectTimeout: Number(process.env.REDIS_CONNECT_TIMEOUT) || 30000
    },
    email: process.env.email || 'temp email'
};