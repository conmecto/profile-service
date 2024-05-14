import { StorageEngine} from 'multer';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from '../config';
import { Environments, constants, enums } from '../utils'; 
import { CustomError, logger } from '../services';

const fileFilterFactory = (key: string) => {
    const typeArray = constants.ALLOWED_FILE_TYPES;
    const fileFilter = (req, file, callback) => {
        if (!typeArray.includes(file.mimetype)) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    };
    return fileFilter;
}

class FileStorageEngine implements StorageEngine {
    key: string;
    constructor(key: string) {
        this.key = key;
    }

    _handleFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, cb: (error: Error | null, data: Record<string, any>) => void): void {
        const userId = req.params?.userId;
        const params: PutObjectCommandInput = {
            Bucket: Environments.aws.s3BucketPost,
            Key: (this.key === 'post' ? `${userId}/post/` : `${userId}/profile-pictures/`) + file.originalname,
            Body: file.stream,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        const parallelUploads3 = new Upload({
            params,
            client: s3Client,
            queueSize: 2,
        });
        parallelUploads3.on('httpUploadProgress', res => {});
        parallelUploads3.done().then(res => cb(null, res)).catch(error => cb(error, {}));
    }

    _removeFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, file: Express.Multer.File, callback: (error: Error | null) => void): void {
        logger(`${this.key} upload file size limit reached`);
        // delete partially uploaded file from s3  
        callback(new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.FILE_SIZE_TOO_LARGE, enums.ErrorCodes.FILE_SIZE_TOO_LARGE));
    }
}

export { FileStorageEngine, fileFilterFactory } 