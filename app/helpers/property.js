const typeOfAnnonciesObj = {
  buy: 'Vente',
  location: 'Location',
};
const sortByObj = {
  increasingPrice: 'Prix croissant',
  decreasingPrice: 'Prix décroissant',
};
const propertyPieces = {
  1: 'Studio',
  2: '2 pièces',
  2: '2 pièces',
  3: '3 pièces',
  3: '3 pièces',
  4: '4 pièces',
  5: '5 pièces',
};
const typeOfAnnoncies = Object.values(typeOfAnnonciesObj);
const typeOfProperties = ['Appartement', 'Maison'];
const sortByKeys = Object.keys(sortByObj);
const sortBySelectMap = sortByKeys.map((name) => ({
  value: name,
  name: sortByObj[name],
}));
const propertyPiecesSelectMap = Object.keys(propertyPieces).map((name) => ({
  value: name,
  name: propertyPieces[name],
}));
const getAddress = ({ postal, city }) =>
  `${city} ${postal ? `/ ${postal.slice(0, 2)}` : ''}`;

module.exports = {
  typeOfAnnonciesObj,
  typeOfAnnoncies,
  typeOfProperties,
  sortByObj,
  sortByKeys,
  sortBySelectMap,
  propertyPiecesSelectMap,
  getAddress,
};
