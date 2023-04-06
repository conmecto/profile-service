import { interfaces, validationSchema, constants, enums } from '../utils';
import { getPreSignedImageUploadUrl, addUrl, CustomError } from '../services';

const getImageUploadUrl = async (req: interfaces.IRequestObject): Promise<interfaces.IImageUploadResponse> => {
    const { id, name }: { id: number, name: string} = req._user;
    await validationSchema.uploadImageSchema.validateAsync(req.body);
    const key = `${id}/${name}`;
    const preSignedUrl = await getPreSignedImageUploadUrl(key, req.body.type, req.body.length);
    if (!preSignedUrl) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER);
    }
    await addUrl(preSignedUrl, id);
    return {
        message: constants.IMAGE_UPLOAD_URL,
        data: [{
            preSignedUrl
        }]
    }
}   

export default getImageUploadUrl;