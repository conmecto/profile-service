import { S3Client, PutObjectCommand } from '@aws-sdk/client-S3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Environments, interfaces } from '../utils';

// add security for upload url (cors or something) for frontend
const getStorageObjectUrl = async ({ bucket, key, acl, expiresIn, length, type }: interfaces.IStorageObject): Promise<string | undefined> => {
    try {
        const client = new S3Client({ 
            credentials: {
                accessKeyId: Environments.aws.accessKeyId,
                secretAccessKey: Environments.aws.secretAccessKey,
            },
            apiVersion: Environments.aws.s3ApiVersion,
            region: Environments.aws.s3Region
        });
        const command = new PutObjectCommand({ Bucket: bucket, Key: key, ACL: acl, ContentLength: length, ContentType: type });
        return await getSignedUrl(client, command, {
            expiresIn
        })
    } catch(err) {
        console.error(err);
    }
}

export { getStorageObjectUrl }

