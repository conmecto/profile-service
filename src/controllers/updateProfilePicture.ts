import { interfaces, enums, validationSchema, Environments } from '../utils';
import { CustomError, updateUserImage } from '../services';

const updateProfilePicture = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.params.userId);
    const fileData = req.body;
    await validationSchema.updateProfilePictureSchema.validateAsync({ ...fileData, userId });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    fileData.bucket = Environments.aws.s3BucketPost;
    await updateUserImage(
        userId, 
        fileData as interfaces.IFileMetadata,
    );
    return {  
        message: 'Profile picture updated successfully'
    };
}

export default updateProfilePicture;