import { interfaces, enums } from '../utils';
import { CustomError, createNewPost } from '../services';

const addPost = async (req: interfaces.IRequestObject) => {
    if (!req.file) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_FILE, enums.ErrorCodes.INVALID_FILE);
    }
    if (!req?.body?.metadata) {
        // delete file from s3
        // Try better way like Change setup to save to local file then s3 
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_FILE, enums.ErrorCodes.INVALID_FILE);
    }

    const userId = req.params.userId;
    const fileData = JSON.parse(req.body.metadata);
    const uploadedData = req.file;
    const metadata = {
        key: uploadedData.Key,
        etag: uploadedData.ETag,
        bucket: uploadedData.Bucket,
        location: uploadedData.Location,
        name: uploadedData.originalname,
        mimetype: uploadedData.mimetype,
        size: fileData.fileSize,
        height: fileData.height,
        width: fileData.width,
    }
    const res = await createNewPost(userId, metadata);
    if (!res) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    return res;
}

export default addPost;