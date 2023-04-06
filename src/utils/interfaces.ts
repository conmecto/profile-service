// Generic
interface IGeneric {
    [key: string]: any
}

interface IGenericResponse {
    message: string
}

// Node reqeust object  
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

interface IImageUploadResponse extends IGenericResponse {
    data: [{
        preSignedUrl: string
    }]
}

//Profile 
interface IProfileUpdateObject {
    description?: string,
    location?: string,
    school?: string,
    work?: string,
    igId?: string,
    snapId?: string,
    interests?: string,
    pic1?: string,
    pic2?: string,
    pic3?: string,
    pic4?: string,
    pic5?: string
}

interface IProfileObject extends IProfileUpdateObject, IBaseModel {
    userId: number,
    name: string
}

export { 
    IGeneric, IRequestObject, IGenericResponse, ICityObject, IStorageObject, IImageUploadResponse, IProfileUpdateObject,
    IProfileObject
};