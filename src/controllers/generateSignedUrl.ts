import { interfaces, validationSchema, enums } from '../utils';
import { addUploadUrlRequest, CustomError } from '../services';
import { generatePresignedUploadUrl } from '../config';

const generateSignedUrl = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.body?.userId);
    const { fileName, contentType } = req.body;
    await validationSchema.generateUploadUrlSchema.validateAsync({ userId, fileName, contentType });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    const generateRes = await generatePresignedUploadUrl({ userId, fileName, contentType });
    if (!generateRes) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    await addUploadUrlRequest(userId, generateRes as string);
    return {
        url: generateRes
    };
}

export default generateSignedUrl;