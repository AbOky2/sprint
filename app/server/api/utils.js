const { PartnerModel, PropertieModel } = require('../models');
const joiSchema = require('../middleware/schema');

const sameQueries = [
  {
    name: { singular: 'propertie', plural: 'properties' },
    model: PropertieModel,
    schema: joiSchema.propertie.admin.propertie,
  },
  {
    name: { singular: 'partner', plural: 'partners' },
    model: PartnerModel,
    schema: joiSchema.partner.admin.partner,
  },
];

module.exports = sameQueries;
