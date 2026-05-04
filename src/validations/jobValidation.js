const Joi = require('joi');

const createJobSchema = Joi.object({
  company_id: Joi.string().uuid().required(),
  category_id: Joi.string().uuid().required(),

  title: Joi.string().required(),
  description: Joi.string().required(),

  job_type: Joi.string().optional(),
  experience_level: Joi.string().optional(),
  location_type: Joi.string().optional(),
  location_city: Joi.string().optional(),

  salary_min: Joi.number().optional(),
  salary_max: Joi.number().optional(),

  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().optional(),
});


const updateJobSchema = Joi.object({
  company_id: Joi.string().uuid(),
  category_id: Joi.string().uuid(),

  title: Joi.string(),
  description: Joi.string(),

  job_type: Joi.string(),
  experience_level: Joi.string(),
  location_type: Joi.string(),
  location_city: Joi.string(),

  salary_min: Joi.number(),
  salary_max: Joi.number(),

  is_salary_visible: Joi.boolean(),
  status: Joi.string(),
}).min(1); // minimal 1 field

module.exports = {
  createJobSchema,
  updateJobSchema,
};