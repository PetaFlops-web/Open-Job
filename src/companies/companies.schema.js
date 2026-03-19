import Joi from "joi";

const addCompanySchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().optional(),
});

export { addCompanySchema };
