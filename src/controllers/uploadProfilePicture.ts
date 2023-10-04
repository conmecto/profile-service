import { interfaces, constants, enums } from '../utils';
import { CustomError, updateUserImage } from '../services';

const uploadProfilePicture = async (req: interfaces.IRequestObject) => {
    if (!req.file) {
        throw new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_FILE, enums.ErrorCodes.INVALID_FILE);
    }
    let deleteUploadedFile = true;
    if (req?.body?.metadata) {
        const metadata = JSON.parse(req.body.metadata);
        if (metadata.fileSize <= constants.MAX_FILE_SIZE_BYTES) {
            deleteUploadedFile = false;
        }
    }

    if (deleteUploadedFile) {
        //delete file from s3
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
    const updateRes = await updateUserImage(userId, metadata);
    return updateRes;
}

export default uploadProfilePicture;