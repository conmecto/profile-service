import { omit } from 'lodash';
import { interfaces, enums, validationSchema, Environments } from '../utils';
import { CustomError, insertPost, callProcessImage } from '../services';

const addPost = async (req: interfaces.IRequestObject) => {
    const userId = Number(req.params.userId);
    const fileData = req.body as interfaces.IFileMetadata;
    await validationSchema.addPostSchema.validateAsync({ ...fileData, userId });
    const user = req.user;
    if (!user) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (Number(user.userId) !== userId) {
        throw new CustomError(enums.StatusCodes.FORBIDDEN, enums.Errors.FORBIDDEN, enums.ErrorCodes.FORBIDDEN);
    }
    fileData.bucket = Environments.aws.s3BucketPost;
    const res = await insertPost(userId, omit(fileData, ['match']), fileData.match as boolean);
    if (!res) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    if (fileData.match) {
        callProcessImage(userId, fileData.location, fileData.name);
    }
    return {  
        message: 'Post added successfully'
    };
}

export default addPost;