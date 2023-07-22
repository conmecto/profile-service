import { interfaces, Environments, constants } from '../utils';
import { getStorageObjectUrl } from '../config';

const getPreSignedImageUploadUrl = async (key: string, type: string, length: number): Promise<string | undefined> => {
    const param: interfaces.IStorageObject = {
        bucket: Environments.aws.s3Bucket,
        key,
        type,
        length,
        acl: constants.IMAGE_PRESIGNED_URL_ACL,
        expiresIn: constants.IMAGE_PRESIGNED_URL_EXPIRED_SECONDS
    }
    const url = await getStorageObjectUrl(param);
    return url;
}

export default getPreSignedImageUploadUrl;

