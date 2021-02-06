const Joi = require('joi');
const { studentRoleList, StatusList } = require('../../../helpers/user');

const update = {
  picture: Joi.any().optional(),
  firstName: Joi.string()
    .min(1)
    .optional(),
  lastName: Joi.string()
    .min(1)
    .optional(),
  slug: Joi.string().optional(),
  age: Joi.date().optional(),
  email: Joi.string()
    .email()
    .optional(),
  password: Joi.string()
    .min(4)
    .optional(),
  phone: Joi.string()
    .min(5)
    .optional(),
  role: Joi.string().valid(...studentRoleList),
  status: Joi.string().valid(...StatusList),
  budget: Joi.number()
    .min(0)
    .optional(),
  school: Joi.string().optional(),
};

const schemas = {
  admin: {
    user: {
      listByRole: Joi.object().keys({
        role: Joi.string().valid(...studentRoleList),
      }),
    },
  },
  public: {
    user: {
      signUp: {
        firstName: Joi.string()
          .min(1)
          .required(),
        lastName: Joi.string()
          .min(1)
          .required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(4)
          .required(),
      },
      signIn: {
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(4)
          .required(),
      },
    },
  },
  all: {
    user: {
      reqUser: {
        _id: Joi.any().required(),
        ...update,
      },
      update,
    },
  },
};

module.exports = schemas;
