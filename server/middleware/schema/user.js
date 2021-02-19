const Joi = require('joi');
const { studentRoleList, StatusList } = require('../../../helpers/user');
const { msg, keys } = require('./messages');

const update = {
  _id: Joi.any().optional(),
  picture: Joi.any()
    .optional()
    .messages(msg({ name: keys.user.picture })),
  bookmarks: Joi.array()
    .optional()
    .messages(msg({ name: keys.user.bookmarks })),
  firstName: Joi.string()
    .min(1)
    .optional()
    .messages(msg({ name: keys.user.firstName })),
  lastName: Joi.string()
    .min(1)
    .optional()
    .messages(msg({ name: keys.user.lastName })),
  slug: Joi.string()
    .optional()
    .messages(msg({ name: keys.user.slug })),
  sponsorshipCode: Joi.string()
    .optional()
    .messages(msg({ name: keys.user.sponsorshipCode })),
  age: Joi.date()
    .optional()
    .messages(msg({ name: keys.user.age })),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages(msg({ name: keys.user.email })),
  password: Joi.string()
    .min(8)
    .optional()
    .messages(msg({ name: keys.user.password })),
  phone: Joi.string()
    .min(5)
    .optional()
    .messages(msg({ name: keys.user.phone })),
  role: Joi.string()
    .valid(...studentRoleList)
    .messages(msg({ name: keys.user.role })),
  status: Joi.string()
    .valid(...StatusList)
    .messages(msg({ name: keys.user.status })),
};

const schemas = {
  admin: {
    user: {
      listByRole: Joi.object().keys({
        offset: Joi.number()
          .min(0)
          .optional()
          .messages(msg({ name: keys.user.offset })),
        limit: Joi.number()
          .min(0)
          .optional()
          .messages(msg({ name: keys.user.limit })),
      }),
    },
  },
  bookmark: {
    post: Joi.object({
      id: Joi.string()
        .min(1)
        .required()
        .messages(msg({ name: keys.id })),
    }),
  },
  sponsorship: {
    post: Joi.object({
      firstName: Joi.string()
        .min(1)
        .required()
        .messages(msg({ name: keys.user.firstName })),
      lastName: Joi.string()
        .min(1)
        .required()
        .messages(msg({ name: keys.user.lastName })),
      email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages(msg({ name: keys.user.email })),
      phone: Joi.string()
        .min(5)
        .required()
        .messages(msg({ name: keys.user.phone })),
    }),
  },
  public: {
    user: {
      signUp: Joi.object({
        firstName: Joi.string()
          .min(1)
          .required()
          .messages(msg({ name: keys.user.firstName })),
        lastName: Joi.string()
          .min(1)
          .required()
          .messages(msg({ name: keys.user.lastName })),
        email: Joi.string()
          .email({ tlds: false })
          .required()
          .messages(msg({ name: keys.user.email })),
        phone: Joi.string()
          .min(5)
          .required()
          .messages(msg({ name: keys.user.phone })),
        password: Joi.string()
          .min(8)
          .required()
          .messages(msg({ name: keys.user.password })),
        role: Joi.string()
          .valid(...studentRoleList)
          .messages(msg({ name: keys.user.role })),
        sponsorshipCode: Joi.string()
          .min(1)
          .optional()
          .messages(msg({ name: keys.user.sponsorshipCode })),
        referrer_url: Joi.string()
          .min(1)
          .optional()
          .messages(msg({ name: keys.user.referrer_url })),
      }),
      signIn: Joi.object({
        email: Joi.string()
          .email({ tlds: false })
          .required()
          .messages(msg({ name: keys.user.email })),
        password: Joi.string()
          .min(4)
          .required()
          .messages(msg({ name: keys.user.password })),
      }),
    },
  },
  all: {
    user: {
      reqUser: Joi.object({
        _id: Joi.any()
          .required()
          .messages(msg({ name: keys.user.id })),
        ...update,
      }),
      update: Joi.object(update),
    },
  },
};

module.exports = schemas;
