const Joi = require('joi');
const { msg, keys } = require('./messages');

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
          .required()
          .messages(msg({ name: keys.partner.name })),
        cover: Joi.string()
          .optional()
          .allow('')
          .messages(msg({ name: keys.partner.cover })),
        type: Joi.string()
          .min(2)
          .max(20)
          .required()
          .messages(msg({ name: keys.partner.type })),
        description: Joi.string()
          .required()
          .messages(msg({ name: keys.partner.description })),
        why: Joi.string()
          .required()
          .messages(msg({ name: keys.partner.why })),
        content: Joi.string()
          .required()
          .messages(msg({ name: keys.partner.content })),
        link: Joi.string()
          .uri()
          .required()
          .messages(msg({ name: keys.partner.link })),
        position: Joi.number().min(0),
      }),
      update: Joi.object().keys({
        picture: Joi.string()
          .optional()
          .allow('')
          .messages(msg({ name: keys.partner.picture })),
        cover: Joi.string()
          .optional()
          .allow('')
          .messages(msg({ name: keys.partner.cover })),
        name: Joi.string()
          .min(3)
          .max(20)
          .required()
          .messages(msg({ name: keys.partner.name })),
        type: Joi.string()
          .min(2)
          .max(20)
          .required()
          .messages(msg({ name: keys.partner.type })),
        description: Joi.string()
          .optional()
          .messages(msg({ name: keys.partner.description })),
        why: Joi.string()
          .optional()
          .messages(msg({ name: keys.partner.why })),
        content: Joi.string()
          .optional()
          .messages(msg({ name: keys.partner.content })),
        link: Joi.string()
          .uri()
          .optional()
          .messages(msg({ name: keys.partner.link })),
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
