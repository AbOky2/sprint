const Joi = require('joi');

const schemas = {
  admin: {
    promotedType: {
      post: Joi.object().keys({
        data: Joi.array().items(Joi.string()).required(),
      }),
    },
    partnerType: {
      post: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
      }),
      update: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
      }),
      delete: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
      }),
    },
  },
};

module.exports = schemas;
