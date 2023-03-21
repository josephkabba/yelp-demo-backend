import * as Joi from "joi";
export const validationObject = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  URL: Joi.string().required(),
  PORT: Joi.number().required(),
  THROTTLE_TTL: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  YELP_API_KEY: Joi.string().required(),
  VALIDATION_MESSAGE: Joi.boolean().required(),
});
