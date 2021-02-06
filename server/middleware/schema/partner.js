const Joi = require('joi');

const swithContent = Joi.object({
  _id: Joi.string().required(),
  position: Joi.number(),
}).required();

const schemas = {
  admin: {
    partner: {
      post: Joi.object().keys({
        name: Joi.string()
          .min(3)
          .max(20)
          .required(),
        type: Joi.string()
          .min(2)
          .max(20)
          .required(),
        description: Joi.string().required(),
        why: Joi.string().required(),
        content: Joi.string().required(),
        link: Joi.string()
          .uri()
          .required(),
        position: Joi.number().min(0),
      }),
      update: Joi.object().keys({
        picture: Joi.string()
          .optional()
          .allow(''),
        name: Joi.string()
          .min(3)
          .max(20)
          .required(),
        type: Joi.string()
          .min(2)
          .max(20)
          .required(),
        description: Joi.string().optional(),
        why: Joi.string().optional(),
        content: Joi.string().optional(),
        link: Joi.string()
          .uri()
          .optional(),
        position: Joi.number().min(0),
      }),
      swapPosition: Joi.object().keys({
        first: swithContent,
        second: swithContent,
      }),
    },
  },
};

module.exports = schemas;
