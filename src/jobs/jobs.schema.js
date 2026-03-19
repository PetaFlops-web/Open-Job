import Joi from "joi";

const jobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().required(),
  experience_level: Joi.string().required(),
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  location_type: Joi.string().optional(),
  location_city: Joi.string().optional(),
  salary_min: Joi.number().optional(),
  salary_max: Joi.number().optional(),
  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().required(),
});

export const updateJobSchema = Joi.object({
  company_id: Joi.string().optional(),
  category_id: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  job_type: Joi.string().optional(),
  experience_level: Joi.string().optional(),
  location_type: Joi.string().optional(),
  location_city: Joi.string().optional(),
  salary_min: Joi.number().optional(),
  salary_max: Joi.number().optional(),
  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().optional(),
});

export { jobSchema };
