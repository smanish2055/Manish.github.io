import Joi from 'joi';

export const todoValidationSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
});