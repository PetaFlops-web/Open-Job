import Joi from "joi";

const applicationSchema = Joi.object({
  job_id: Joi.string().required(),
  status: Joi.string().required(),
});

const updateApplicationSchema = Joi.object({
    status: Joi.string().required()
})

export { applicationSchema, updateApplicationSchema };
