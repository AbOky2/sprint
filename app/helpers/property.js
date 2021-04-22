const { NEXT_PUBLIC_UPLOAD_URL } = require('../config');

const defaultPropertyImg = '/properties/default-property.jpg';
const typeOfAnnonciesObj = {
  buy: 'Vente',
  location: 'Location',
};
const sortByObj = {
  asc: 'Trier par prix croissant',
  desc: 'Trier par prix décroissant',
};
const propertyPieces = {
  1: 'Studio',
  4: '4 pièces',
  2: '2 pièces',
  5: '5 pièces',
  3: '3 pièces',
};
const typeOfAnnoncies = Object.values(typeOfAnnonciesObj);
const typeOfProperties = ['Appartement', 'Maison'];
const sortByKeys = Object.keys(sortByObj);
const sortBySelectMap = sortByKeys.map((name) => ({
  value: name,
  name: sortByObj[name],
}));
const propertyPiecesKeys = [1, 4, 2, 5, 3];
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

getCardImg = (src) => NEXT_PUBLIC_UPLOAD_URL + (src || defaultPropertyImg);

module.exports = {
  typeOfAnnonciesObj,
  typeOfAnnoncies,
  typeOfProperties,
  sortByObj,
  sortByKeys,
  sortBySelectMap,
  propertyPiecesKeys,
  propertyPiecesSelectMap,
  defaultPropertyImg,
  getAddress,
  getNbPieces,
  getCardImg,
};
