import { interfaces, Environments } from '../utils';
import { getStorageObjectUrl } from '../config';

const getPreSignedImageUploadUrl = async (key: string, type: string, length: number): Promise<string | undefined> => {
    const param: interfaces.IStorageObject = {
        bucket: Environments.aws.s3Bucket,
        key,
        type,
        length,
        acl: '',
        expiresIn: 300
    }
    const url = await getStorageObjectUrl(param);
    return url;
}

export default getPreSignedImageUploadUrl;

