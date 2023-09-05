import { interfaces, validationSchema, constants, enums, helpers } from '../utils';
import { getPreSignedImageUploadUrl, addUrl, CustomError, checkProfileByUserAndProfileId, getProfileCache } from '../services';

const generateImageUploadUrl = async (req: interfaces.IRequestObject): Promise<interfaces.IImageUploadResponse> => {
    const userId = Number(req.user.id);
    await validationSchema.uploadImageSchema.validateAsync(req.body);
    await validationSchema.profileIdParamSchema.validateAsync(req.params);
    const profileId = Number(req.params['id']); 
    
    let profile: interfaces.ICacheProfileValue | interfaces.ICheckProfileResponse | null = await getProfileCache(`profile:user:${userId}`);
    if (!profile) {
        profile = await checkProfileByUserAndProfileId(profileId, userId);
    } 
    if (!profile) {
        throw new CustomError(enums.StatusCodes.NOT_FOUND, enums.Errors.PROFILE_NOT_FOUND, enums.ErrorCodes.PROFILE_NOT_FOUND);
    }
    const { size, filename, mimetype }: { size: number, filename: string, mimetype: string } = <interfaces.ICreateImageUploadUrlBody>req.body;
    const key = constants.IMAGE_PRESIGNED_URL_FILE_PATH + filename;
    const preSignedUrl = await getPreSignedImageUploadUrl(key, mimetype, size);
    if (!preSignedUrl) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    const res = await addUrl({ link: preSignedUrl, profileId, mimetype, size, filename });
    if (!res) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    return {
        message: constants.IMAGE_UPLOAD_URL_GENERATED,
        data: [{
            preSignedUrl
        }]
    }
}   

export default generateImageUploadUrl;