import { interfaces, enums } from '../utils';
import { CustomError, updateUserImage } from '../services';

const uploadProfilePicture = async (req: interfaces.IRequestObject): Promise<interfaces.IGenericResponse> => {
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
    const updateRes = await updateUserImage(userId, metadata);
    if (!updateRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    return { message: 'Profile picture updated successfully' };
}

export default uploadProfilePicture;