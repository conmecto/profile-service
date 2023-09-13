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
    headers: IGeneric
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
    expiresIn: number, 
    length: number, 
    type: string
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
    userName?: string,
    description?: string,
    location?: string,
    school?: string,
    work?: string,
    igId?: string,
    snapId?: string,
    interests?: string,
    image1?: string,
    image2?: string,
    image3?: string,
    image4?: string,
    image5?: string,
}

interface IProfileObject extends IProfileUpdateObject, IBaseModel {
    userId: number,
    name: string
}

interface ICheckProfileResponse {
    userId: number,
    id: number
}

interface ICreateProfileObject {
    userId: number,
    description?: string,
    userName: string,
    name: string,
    location?: string,
    school?: string,
    work?: string,
    igId?: string,
    snapId?: string,
    image1?: string,
    image2?: string,
    image3?: string,
    image4?: string,
    image5?: string,
    age: number,
    interests?: string
}

interface IAddProfileResponse {
    profileId: number
}

interface IGetProfileResponse extends IProfileObject {
    id: number
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

interface IGetMultipleProfiles extends IProfileObject {
    id: number,
    userName: string,
    name: string,
    userId: number,
    image1?: string
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, IStorageObject, IImageUploadResponse, IProfileUpdateObject,
    IProfileObject, ICreateProfileObject, IAddProfileResponse, ICreateImageUploadUrlBody, IGetProfileResponse, IAddImageMetadata,
    ICacheProfileValue, ICheckProfileResponse, ICustomerRequest, IGetMultipleProfiles
};