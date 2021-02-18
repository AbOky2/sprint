const Joi = require('joi');

const schemas = {
  admin: {
    partnerType: {
      post: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
      }),
      update: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
      }),
    },
  },
};

module.exports = schemas;
