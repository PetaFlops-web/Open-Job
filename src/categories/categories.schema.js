import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export { categorySchema };
