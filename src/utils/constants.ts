const PROFILE_UPDATED = 'Profile updated successfully';

const DB_CONNECTION_TIMEOUT_MILLIS = 2000;
const DB_MAX_CLIENTS = 20;
const DB_IDLE_TIMEOUT_MILLIS = 30000;


const ALLOWED_FILE_TYPES = [
  'image/avif', 'image/bmp', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp', 'image/heic', 
  'image/heif', 'image/heic-sequence', 'image/apng', 'video/x-msvideo', 'video/mp4', 'video/mpeg', 'video/quicktime',
  'video/3gpp', 'video/ogg', 'video/webm', 'video/hevc', 'video/avc'
]

//100mb
const MAX_FILE_SIZE_BYTES = 104857600;
const MAX_FIELD_SIZE_BYTES = 104857600;

export {
  PROFILE_UPDATED, DB_CONNECTION_TIMEOUT_MILLIS, DB_IDLE_TIMEOUT_MILLIS, DB_MAX_CLIENTS, MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES,
  MAX_FIELD_SIZE_BYTES
}