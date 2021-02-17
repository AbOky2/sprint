const Joi = require('joi');
const { studentRoleList, StatusList } = require('../../../helpers/user');

const update = {
  _id: Joi.any().optional(),
  picture: Joi.any().optional(),
  bookmarks: Joi.array().optional(),
  firstName: Joi.string().min(1).optional(),
  lastName: Joi.string().min(1).optional(),
  slug: Joi.string().optional(),
  sponsorshipCode: Joi.string().optional(),
  age: Joi.date().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  phone: Joi.string().min(5).optional(),
  role: Joi.string().valid(...studentRoleList),
  status: Joi.string().valid(...StatusList),
};

const schemas = {
  admin: {
    user: {
      listByRole: Joi.object().keys({
        offset: Joi.number().min(0).optional(),
        limit: Joi.number().min(0).optional(),
      }),
    },
  },
  bookmark: {
    post: {
      id: Joi.string().min(1).required(),
    },
  },
  sponsorship: {
    post: {
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(5).required(),
    },
  },
  public: {
    user: {
      signUp: {
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(5).optional(),
        password: Joi.string().min(8).required(),
        role: Joi.string().valid(...studentRoleList),
        sponsorshipCode: Joi.string().min(1).optional(),
        referrer_url: Joi.string().min(1).optional(),
      },
      signIn: {
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
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
