const Joi = require('joi');
const { typeOfAnnoncies } = require('../../../helpers/property');

const swithContent = Joi.object({
  _id: Joi.string().required(),
  position: Joi.number(),
}).required();

const searchObj = {
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
  loc: Joi.string().optional().allow(''),
  point: Joi.any(),
  typeOfAnnonce: Joi.string().valid(...typeOfAnnoncies),
  typeOfProperty: Joi.any(),
  sort: Joi.string().optional(),
  maxPrice: Joi.number().min(-1).optional(),
  pieces: Joi.any().optional(),
};
const schemas = {
  admin: {
    propertie: {
      post: Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        address: Joi.string().required(),
        nb_available: Joi.number().required(),
        location_date: Joi.string().required(),
        position: Joi.number().min(0).optional(),
      }),
      update: Joi.object().keys({
        picture: Joi.string().optional().allow(''),
        name: Joi.string().min(3).max(20).optional(),
        description: Joi.string().optional(),
        dimension: Joi.string().optional(),
        address: Joi.string().optional(),
        nb_available: Joi.number().optional(),
        location_date: Joi.string().optional(),
        position: Joi.number().min(0).optional(),
      }),
      swapPosition: Joi.object().keys({
        first: swithContent,
        second: swithContent,
      }),
    },
  },
  student: {
    search: Joi.object().keys({
      ...searchObj,
    }),
    searchByCoord: Joi.object().keys({
      ...searchObj,
      zoom: Joi.number().min(0).required(),
      box: Joi.any(),
    }),
  },
};

module.exports = schemas;
