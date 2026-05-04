const Joi = require('joi');

exports.companySchema = Joi.object({
  name: Joi.string().min(3).required(),

  description: Joi.string().optional(),

  location: Joi.string().required(),
});