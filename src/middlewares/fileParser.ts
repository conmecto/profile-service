import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from '../config';
import { Environments, constants } from '../utils'; 

const fileFilter = function (req, file, callback) {
    if (!constants.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
       callback(null, false);
    } else {
        callback(null, true);
    }
};

function ProfilePictureStorage() {}
ProfilePictureStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    const userId = req.params?.userId;
    const params = {
        Bucket: Environments.aws.s3Bucket,
        Key: `${userId}/profile-pictures/` + file.originalname,
        Body: file.stream,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };
    const parallelUploads3 = new Upload({
        params,
        client: s3Client,
        queueSize: 2,
    });
    parallelUploads3.on('httpUploadProgress', res => { 
        console.log('multipart upload file res', res); 
    });
    parallelUploads3.done().then(res => cb(null, res)).catch(error => cb(error, {}));
}

export { ProfilePictureStorage, fileFilter } 