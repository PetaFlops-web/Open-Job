import Joi from "joi";

export const uploadDocumentSchema = Joi.object({
  mimetype: Joi.string().valid("application/pdf").required().messages({
    "any.only": "Hanya file PDF yang diperbolehkan.",
    "any.required": "File is required",
    "string.empty": "File is required",
    "string.base": "File is required",
  }),
  size: Joi.number()
    .max(5 * 1024 * 1024)
    .required()
    .messages({
      "number.max": "File terlalu besar. Maksimal 5MB.",
      "any.required": "File is required",
    }),
});
