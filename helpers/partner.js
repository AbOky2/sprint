const partnerTypeKey = {
  realEstate: 'realEstate',
  banks: 'banks',
  assurance: 'assurance',
};

const partnerTypes = {
  [partnerTypeKey.realEstate]: 'Immobilier',
  [partnerTypeKey.banks]: 'Banques',
  [partnerTypeKey.assurance]: 'Insurance',
};
const partnerTypeListKeys = Object.keys(partnerTypes);
const partnerValues = Object.values(partnerTypes);

module.exports = {
  partnerTypeListKeys,
  partnerTypes,
  partnerTypeKey,
  partnerValues,
};
