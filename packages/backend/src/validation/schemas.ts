import Joi from 'joi';

export const todoValidationSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(5).max(100).required(),
  isPrivate: Joi.boolean(),
  status: Joi.string()
});
