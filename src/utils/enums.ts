export enum Country {
    INDIA = 'in',
    // AUSTRALIA = 'au',
    // UNITED_KINGDOM = 'gb',
    UNITED_STATES_OF_AMERICA = 'us',
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export enum Gender {
    MAN = 'man',
    WOMAN = 'woman',
    NON_BINARY = 'nonbinary',
    NOT_SPECIFIED = 'n/s'
}

export enum SearchFor {
    MEN = 'men',
    WOMEN = 'women',
    EVERYONE = 'everyone'
}

export enum StatusCodes {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INVALID_TOKEN = 498,

    INTERNAL_SERVER = 500
}

export enum Errors {
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden Resource',

    TOKEN_NOT_SUPPLIED = 'Token not supplied',
    TOKEN_INVALID = 'Token invalid',
    TOKEN_EXPIRED = 'Token expired',
    INVALID_TOKEN_PARAMS = 'Token params invalid',

    CITY_NOT_FOUND = 'City not found',
    PROFILE_NOT_FOUND = 'Profile not found',
    POST_NOT_FOUND = 'Post not found',

    INVALID_FILE = 'Invalid file',
    FILE_SIZE_TOO_LARGE = 'File size too large',

    UNAUTHORIZED_REQUEST = 'Unauthorized request',
    CONLFIC_USER_NAME = 'User name already exists',

    INTERNAL_SERVER = 'Internal server error',
}


export enum PrefixesForLogs {
    AUTH_TOKEN_INVALID_ERROR = 'Auth token invalid error: ',
    AUTH_TOKEN_EXPIRED_ERROR = 'Auth token expired error: ',

    REDIS_SET_OBJECT = 'Redis set object error: ',
    REDIS_GET_PROFILE = 'Redis get profile error: ',
    REDIS_GET_OBJECT = 'Redis get object error: ', 
    REDIS_CONNECTION_ERROR_CLIENT1 = 'Redis client 1 connection error: ',
    REDIS_CONNECTION_ERROR_CLIENT2 = 'Redis client 2 connection error: ',
    REDIS_CONNECTION_READY_CLIENT1 = 'Redis client 1 is ready: ',
    REDIS_CONNECTION_READY_CLIENT2 = 'Redis client 2 is ready: ',
    REDIS_PUBLISH_CHANNEL_ERROR = 'Redis publish channel error: ',
    REDIS_SUBSCRIBE_CHANNEL_ERROR = 'Redis subscribe channel error: ',
    REDIS_LOGGING_CHANNEL_ERROR = 'Redis logging channel error: ',
    REDIS_CHANNEL_ACCOUNT_REMOVED_MESSAGE_ERROR = 'Redis channel account removed message error: ',
    
    DB_CONNECTED = 'DB connection successful: ',
    DB_CONNECTION_FAILED = 'DB connection failed: ',
    DB_INSERT_PROFILE_ERROR = 'DB insert profile error: ',
    DB_CHECK_PROFILE_BY_USER_AND_PROFILE_ID_ERROR = 'DB check profile by user and profile id error: ',
    DB_GET_PROFILE_BY_PROFILE_ID_ERROR = 'DB get profile by profile id error: ',
    DB_INSERT_IMAGE_METADATA_ERROR = 'DB insert image metadata error: ',
    DB_UPDATE_PROFILE_ERROR = 'DB update profile error: ',
    DB_SEARCH_CITIES_ERROR = 'DB search cities error: ',
    DB_SEARCH_USER_NAME_ERROR = 'DB serach user name error: ',
    DB_GET_PROFILE_BY_USER_ID_ERROR = 'DB get profile by userid error: ',
    DB_GET_MULTIPLE_PROFILES_BY_USER_IDS_ERROR = 'DB get multiple profiles by userIds error: ',
    DB_SEARCH_PROFILES_ERROR = 'DB search profiles error: ',
    DB_UPDATE_PROFILE_PICTURE_ERROR = 'DB update profile picture error: ',
    DB_CREATE_POST_ERROR = 'DB create post error: ',
    DB_GET_POSTS_ERROR = 'DB get posts error: ',
    DB_DELETE_POST_ERROR = 'DB delete post error: ',
    DB_REPORT_POST_ERROR = 'DB report post error: ',
    
    EMAIL_SEND_ERROR = 'Email send error: ',

    MIDDLEWARE_PARSE_USER_ERROR = 'Middleware parse user error: ',

    AWS_CHECK_BUCKET_ERROR = 'AWS check bucket error: ',
    AWS_CREATE_BUCKET_ERROR = 'AWS create bucket error: ',
    AWS_UPLOAD_OBJECT_ERROR = 'AWS upload object error: ',
    AWS_GENERATE_UPLOAD_URL_ERROR = 'AWS generate upload url error: ',
}

export enum ErrorCodes {
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',

    VALIDATION_ERROR = 'VALIDATION_ERROR',

    TOKEN_NOT_SUPPLIED = 'TOKEN_NOT_SUPPLIED',
    TOKEN_INVALID = 'TOKEN_INVALID',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    INVALID_TOKEN_PARAMS = 'INVALID_TOKEN_PARAMS',

    CONLFIC_USER_NAME = 'CONLFIC_USER_NAME',

    INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
    VERIFICATION_CODE_EXPIRED = 'VERIFICATION_CODE_EXPIRED',
    VERIFICATION_CODE_ISSUED_RECENTLY = 'VERIFICATION_CODE_ISSUED_RECENTLY',
    VERIFICATION_CODE_GENERATE_LIMIT = 'VERIFICATION_CODE_GENERATE_LIMIT',
    VERIFICATION_CODE_ATTEMPTS_LIMIT = 'VERIFICATION_CODE_ATTEMPTS_LIMIT',

    INVALID_FILE = 'INVALID_FILE',
    FILE_SIZE_TOO_LARGE = 'FILE_SIZE_TOO_LARGE',

    CITY_NOT_FOUND = 'CITY_NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND',
    POST_NOT_FOUND = 'POST_NOT_FOUND',

    DUPLICATE_USER = 'DUPLICATE_USER',

    INTERNAL_SERVER = 'INTERNAL_SERVER',
}

export enum FIELDS_DB_NAME {
    'name' = 'name',
    'description' = 'description',
    'city' = 'city',
    'work' = 'work',
    'university' = 'university',
    'preferences' = 'preferences',
	'traits' = 'traits',
	'lookingFor' = 'looking_for',
    'dob' = 'dob'
}