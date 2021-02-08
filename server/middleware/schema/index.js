const Joi = require('joi');
const partner = require('./partner');
const propertie = require('./propertie');
const user = require('./user');
// import agency from './agency';

const idParams = Joi.object().keys({
  id: Joi.string(),
});
const request = {
  list: Joi.object().keys({
    offset: Joi.number().min(0).optional(),
    limit: Joi.number().min(0).optional(),
  }),
  get: idParams,
  update: idParams,
  delete: idParams,
};

module.exports = {
  request,
  partner,
  user,
  propertie,
  // agency,
};
