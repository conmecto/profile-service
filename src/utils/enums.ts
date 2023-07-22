export enum StatusCodes {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,

    INTERNAL_SERVER = 500
}

export enum Errors {
    CITY_NOT_FOUND = 'City not found',
    PROFILE_NOT_FOUND = 'Profile not found',

    UNAUTHORIZED_REQUEST = 'Unauthorized request',

    INTERNAL_SERVER = 'Internal server error',
}


export enum PrefixesForLogs {
    REDIS_SET_OBJECT = 'Redis set object error: ',
    REDIS_GET_PROFILE = 'Redis get profile error: ',
    REDIS_GET_OBJECT = 'Redis get object error: ', 
    REDIS_CONNECTION_ERROR_CLIENT1 = 'Redis client 1 connection error: ',
    REDIS_CONNECTION_ERROR_CLIENT2 = 'Redis client 2 connection error: ',
    REDIS_CONNECTION_READY_CLIENT1 = 'Redis client 1 is ready: ',
    REDIS_CONNECTION_READY_CLIENT2 = 'Redis client 2 is ready: ',
    REDIS_PUBLISH_CHANNEL_ERROR = 'Redis publish channel error: ',
    REDIS_SUBSCRIBE_CHANNEL_ERROR = 'Redis subscribe channel error: ',
    REDIS_CHANNEL_MESSAGE_RECEIVE_ERROR = 'Redis channel message receive error: ',
    
    DB_CONNECTED = 'DB connection successful: ',
    DB_CONNECTION_FAILED = 'DB connection failed: ',
    DB_INSERT_PROFILE_ERROR = 'DB insert profile error: ',
    DB_CHECK_PROFILE_BY_USER_AND_PROFILE_ID_ERROR = 'DB check profile by user and profile id error: ',
    DB_GET_PROFILE_BY_PROFILE_ID_ERROR = 'DB get profile by profile id error: ',
    DB_INSERT_IMAGE_METADATA_ERROR = 'DB insert image metadata error: ',
    DB_UPDATE_PROFILE_ERROR = 'DB update profile error: ',
    DB_SEARCH_CITIES_ERROR = 'DB search cities error: ',

    EMAIL_SEND_ERROR = 'Email send error: '
}

export enum ImageMimetypes {
    IMAGE_PNG = 'image/png',
    IMAGE_HEIF = 'image/heif',
    IMAGE_HEIC = 'image/heic',
    IMAGE_GIF = 'image/gif',
    IMAGE_JPG = 'image/jpg',
    IMAGE_JPEG = 'image/jpeg'
}