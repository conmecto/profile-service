import { Request } from 'express';

// Generic
interface IGeneric {
    [key: string]: any
}

interface IGenericResponse {
    message: string
}

// Node request object  
interface ICustomerRequest extends Request {
    user?: Record<string, any>
}

interface IRequestObject extends IGeneric {
    body: IGeneric,
    query: IGeneric,
    params: IGeneric,
    method: string,
    path: string,
    headers: IGeneric,
    file?: IGeneric
}

//BaseModel
interface IBaseModel {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

// City 
interface ICityObject {
    id?: number,
    city: string,
    country?: string
}

//Image Upload
interface IStorageObject {
    bucket: string, 
    key: string, 
    acl: string, 
    size: number, 
    mimetype: string
}

interface ICreateImageUploadUrlBody {
    size: number,
    filename: string,
    mimetype: string
}

interface IImageUploadResponse extends IGenericResponse {
    data: [{
        preSignedUrl: string
    }]
}

//Profile 
interface IProfileUpdateObject {
    name: string,
    description: string,
    city: string,
    work: string,
    university: string,
    preferences: string,
	traits: string,
	lookingFor: string
}

interface ICheckProfileResponse {
    userId: number,
    id: number
}

interface ICreateProfileObject {
    userId: number,
    userName: string,
    name: string,
    country: string
}

interface IAddProfileResponse {
    profileId: number
}

interface IGetProfileResponse {
    id: number,
    name: string,
    description: string,
    city: string,
    work: string,
    university: string,
    age?: number,
    preferences: string,
	traits: string,
	lookingFor: string,
    profilePicture: string
}

interface ICacheProfileValue extends IGetProfileResponse {}

// Images
interface IAddImageMetadata {
    profileId: number,
    link: string,
    filename: string,
    mimetype: string,
    size: number;
}

interface IGetMultipleProfiles {
    id: number,
    name: string,
    userId: number,
    profilePicture?: string
}

interface ISearchProfileFilterObj {
    q?: string,
    page: number,
    perPage: number,
    city?: string,
    country: string
}

interface IFileMetadata {
    user_id?: number,
    key: string,
    etag?: string,
    bucket: string,
    name: string,
    mimetype: string,
    size: number, 
    height?: number,
    width?: number,
    match?: boolean
}

interface IPaginationOptions {
    page: number,
    perPage: number,
    sort?: string,
    order?: string 
}

interface IPostDetail {
    id: number,
    userId: number,
    location: string,
    type: string,
    fileMetadataId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null,
    hasMore: boolean
}

//Auth Middleware

interface ITokenVerifyResponse {
    userId: number,
    extension: string,
    number: string,
    jti: string;
    exp: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    nbf?: number;
    iat?: number;
}

interface IGenerateUploadUrlBody { 
    userId: number, 
    fileName: string, 
    contentType: string,
    uploadType: string
}

interface IGetFeedPayload { 
    userId: number,
    page: number,
    perPage: number
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, IStorageObject, IImageUploadResponse, IProfileUpdateObject,
    ICreateProfileObject, IAddProfileResponse, ICreateImageUploadUrlBody, IGetProfileResponse, IAddImageMetadata,
    ICacheProfileValue, ICheckProfileResponse, ICustomerRequest, IGetMultipleProfiles, ISearchProfileFilterObj, IFileMetadata,
    IPaginationOptions, IPostDetail, ITokenVerifyResponse, IGenerateUploadUrlBody, IGetFeedPayload
};