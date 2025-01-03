const PROFILE_UPDATED = 'Profile updated successfully';

const DB_CONNECTION_TIMEOUT_MILLIS = 10000;
const DB_MAX_CLIENTS = 20;
const DB_IDLE_TIMEOUT_MILLIS = 30000;

const ALLOWED_IMAGE_TYPES = [
  'image/avif', 'image/bmp', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp', 'image/heic', 
  'image/heif', 'image/heic-sequence', 'image/apng'
]

const ALLOWED_FILE_TYPES = [
  'image/avif', 'image/bmp', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp', 'image/heic', 
  'image/heif', 'image/heic-sequence', 'image/apng', 
  // 'video/x-msvideo', 'video/mp4', 'video/mpeg', 'video/quicktime',
  // 'video/3gpp', 'video/ogg', 'video/webm', 'video/hevc', 'video/avc'
]

const ALLOWED_UPLOAD_TYPES = ['post', 'profilePicture'];

//10mb
const MAX_PROFILE_PICTURE_SIZE_BYTES = 10485760;
//10mb
const MAX_PROFILE_PICTURE_FIELD_SIZE_BYTES = 10485760;

//10mb
const MAX_FILE_SIZE_BYTES = 10485760;
//10mb
const MAX_FILE_FIELD_SIZE_BYTES = 10485760;

const AWS_PRESIGNED_URL_TIMEOUT_SEC = 120;
const AWS_PRESIGNED_URL_MIN_SIZE_BYTES = 10240;
const AWS_PRESIGNED_URL_MAX_SIZE_BYTES = 10485760;

export {
  PROFILE_UPDATED, DB_CONNECTION_TIMEOUT_MILLIS, DB_IDLE_TIMEOUT_MILLIS, DB_MAX_CLIENTS, MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES,
  MAX_FILE_FIELD_SIZE_BYTES, ALLOWED_IMAGE_TYPES, MAX_PROFILE_PICTURE_FIELD_SIZE_BYTES, MAX_PROFILE_PICTURE_SIZE_BYTES, 
  AWS_PRESIGNED_URL_TIMEOUT_SEC, AWS_PRESIGNED_URL_MIN_SIZE_BYTES, AWS_PRESIGNED_URL_MAX_SIZE_BYTES, ALLOWED_UPLOAD_TYPES
}