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
    description: Joi.string().max(5000).optional(),
    university: Joi.string().max(500).optional(),
    work: Joi.string().max(500).optional(),
    city: Joi.string().max(200).optional()
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
    perPage: Joi.number().required(),
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

const blockParamSchema = Joi.object({
    userId: Joi.number().required(),
    blockedUserId: Joi.number().required()
});

const markPostsViewedParamSchema = Joi.object({
    userId: Joi.number().required(),
    postIds: Joi.array().items(Joi.number()).min(1).required()
});

const postReactionParamSchema = Joi.object({
    postId: Joi.number().required()
});

const generateUploadUrlSchema =  Joi.object({
    userId: Joi.number().required(),
    fileName: Joi.string().required(),
    contentType: Joi.string().valid(...ALLOWED_IMAGE_TYPES).required()
});

const addPostSchema = Joi.object({
    userId: Joi.number().required(),
    key: Joi.string().max(1000).required(),
    name: Joi.string().max(500).required(),
    mimetype: Joi.string().max(500).required(),
    size: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    match: Joi.boolean().required(),
    caption: Joi.string().required(),
    tags: Joi.string().optional()
});

const getFeedSchema = Joi.object({
    userId: Joi.number().required(),
    page: Joi.number().required(),
    perPage: Joi.number().required()
});

export { 
    profileUpdateSchema, profileIdParamSchema, userHeaderSchema, multipleUsersProfileSchema, searchProfilesSchema,
    userPostsQuerySchema, deletePostParamSchema, reportPostParamSchema, generateUploadUrlSchema, addPostSchema,
    getFeedSchema, markPostsViewedParamSchema, postReactionParamSchema, blockParamSchema
};