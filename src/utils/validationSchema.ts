import Joi from 'joi';
import { Country } from './enums';

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

export { profileUpdateSchema, profileIdParamSchema, userHeaderSchema, multipleUsersProfileSchema, searchProfilesSchema };