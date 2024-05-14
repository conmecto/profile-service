import Joi from 'joi';
import { Country, SortOrder } from './enums';
import { ALLOWED_IMAGE_TYPES } from './constants';

const profileIdParamSchema = Joi.object({
    userId: Joi.number().required()
});

const userHeaderSchema = Joi.object({
    id: Joi.number().required(),
    email: Joi.string().required()
});

const profileUpdateSchema = Joi.object({
    name: Joi.string().max(200).optional(),
    userName: Joi.string().max(200).optional(),
    description: Joi.string().max(5000).optional(),
    school: Joi.string().max(500).optional(),
    work: Joi.string().max(500).optional(),
    igId: Joi.string().max(200).optional(),
    snapId: Joi.string().max(200).optional(),
    city: Joi.string().max(200).optional(),
    interests: Joi.string().max(5000).optional()
});

const multipleUsersProfileSchema = Joi.object({
    userIds: Joi.string().required()
});

const searchProfilesSchema = Joi.object({
    q: Joi.string().min(4).optional(),
    page: Joi.number().min(1).required().default(1),
    perPage: Joi.number().min(10).required().default(10),
    city: Joi.string().optional(),
    country: Joi.string().valid(...Object.values(Country)).optional(),
    sameCity: Joi.boolean().optional()
});

const userPostsQuerySchema = Joi.object({
    page: Joi.number().min(1).required().default(1),
    perPage: Joi.number().min(10).required().default(10),
    sort: Joi.string().optional().default('createdAt'),
    order: Joi.string().optional().default(SortOrder.DESC)
});

const deletePostParamSchema = Joi.object({
    userId: Joi.number().required(),
    postId: Joi.number().required()
});

const reportPostParamSchema = Joi.object({
    postId: Joi.number().required()
});

const generateUploadUrlSchema =  Joi.object({
    userId: Joi.number().required(),
    fileName: Joi.string().required(),
    contentType: Joi.string().valid(...ALLOWED_IMAGE_TYPES).required()
});

const addPinnedPostSchema = Joi.object({
    userId: Joi.number().required(),
    key: Joi.string().max(500).required(),
    location: Joi.string().max(500).required(),
    name: Joi.string().max(500).required(),
    mimetype: Joi.string().max(500).required(),
    size: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    match: Joi.boolean().required()
});

export { 
    profileUpdateSchema, profileIdParamSchema, userHeaderSchema, multipleUsersProfileSchema, searchProfilesSchema,
    userPostsQuerySchema, deletePostParamSchema, reportPostParamSchema, generateUploadUrlSchema, addPinnedPostSchema
};