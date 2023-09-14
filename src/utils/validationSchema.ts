import Joi from 'joi';
import { IMAGE_MAX_SIZE_BYTES } from './constants';
import { ImageMimetypes, Country } from './enums';

const uploadImageSchema = Joi.object({
    size: Joi.number().max(IMAGE_MAX_SIZE_BYTES).required(),
    mimetype: Joi.string().valid(...Object.values(ImageMimetypes)).required(),
    filename: Joi.string().required()
});

const profileIdParamSchema = Joi.object({
    id: Joi.number().required()
});

const userHeaderSchema = Joi.object({
    id: Joi.number().required(),
    email: Joi.string().required()
});

const profileUpdateSchema = Joi.object({
    userName: Joi.string().max(200),
    description: Joi.string().max(5000),
    school: Joi.string().max(500),
    work: Joi.string().max(500),
    igId: Joi.string().max(200),
    snapId: Joi.string().max(200),
    city: Joi.string().max(200),
    interests: Joi.string().max(5000),
    image1: Joi.string().max(5000),
    image2: Joi.string().max(5000),
    image3: Joi.string().max(5000),
    image4: Joi.string().max(5000),
    image5: Joi.string().max(5000)
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

export { uploadImageSchema, profileUpdateSchema, profileIdParamSchema, userHeaderSchema, multipleUsersProfileSchema, searchProfilesSchema };