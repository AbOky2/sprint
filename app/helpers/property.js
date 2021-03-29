const typeOfAnnonciesObj = {
  buy: 'Vente',
  location: 'Location',
};
const sortByObj = {
  asc: 'Prix croissant',
  desc: 'Prix décroissant',
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
const propertyPiecesKeys = Object.keys(propertyPieces);
const propertyPiecesSelectMap = propertyPiecesKeys.map((name) => ({
  value: name,
  name: propertyPieces[name],
}));
const getAddress = ({ postal, city }) =>
  postal && city ? `${city} ${postal ? `/ ${postal.slice(0, 2)}` : ''}` : null;

const getNbPieces = (minPieces, maxPieces) =>
  minPieces !== maxPieces
    ? `de ${minPieces} à ${maxPieces}  pièces`
    : `${minPieces} pièce${minPieces === 1 ? '' : 's'}`;

module.exports = {
  typeOfAnnonciesObj,
  typeOfAnnoncies,
  typeOfProperties,
  sortByObj,
  sortByKeys,
  sortBySelectMap,
  propertyPiecesKeys,
  propertyPiecesSelectMap,
  getAddress,
  getNbPieces,
};
