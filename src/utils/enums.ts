export enum Gender {
    MAN = 'man',
    WOMAN = 'woman'
}

export enum Search {
    MAN = 'man',
    WOMAN = 'woman',
    ALL = 'all'
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export enum Country {
    INDIA = 'india'
}

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
    USER_NOT_FOUND = 'User not found',

    UNAUTHORIZED_REQUEST = 'Unauthorized request',

    INTERNAL_SERVER = 'Internal server error',

}

export enum ErrorsMessages {}