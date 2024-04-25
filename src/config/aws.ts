import { S3Client, CreateBucketCommand, HeadBucketCommand, PutPublicAccessBlockCommand } from '@aws-sdk/client-s3';
import { Environments, enums } from '../utils';
import { logger } from '../services';

const runAwsFile = () => {};

const s3Client = new S3Client({ 
    credentials: {
        accessKeyId: Environments.aws.accessKeyId,
        secretAccessKey: Environments.aws.secretAccessKey,
    },
    region: Environments.aws.s3Region
});
const checkOrCreateBucket = async (bucket: string) => {
    let checkBucketExists = false;
    if (!s3Client) {
        throw new Error('S3 client not found');
    } 
    try {
        const command = new HeadBucketCommand({
            Bucket: bucket
        });            
        const res = await s3Client.send(command);
        checkBucketExists = true; 
    } catch(error) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.AWS_CHECK_BUCKET_ERROR + error?.toString());
    }

    try {
        if (checkBucketExists) {
            return;
        }
        const createCommand = new CreateBucketCommand({
            Bucket: bucket,
            CreateBucketConfiguration: {
                LocationConstraint: Environments.aws.s3Region
            },
            ObjectOwnership: 'BucketOwnerPreferred',
        });
        const updateBucketCommand = new PutPublicAccessBlockCommand({
            Bucket: bucket,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: false
            }
        });
        const createRes = await s3Client.send(createCommand);
        if (createRes?.Location) {
            await s3Client.send(updateBucketCommand);
        }
    } catch(error) {
        await logger('Profile Service: ' + enums.PrefixesForLogs.AWS_CREATE_BUCKET_ERROR + error?.toString());
    }
};

checkOrCreateBucket(Environments.aws.s3BucketPost);

export { runAwsFile, s3Client }

