const { typeOfAnnonciesObj } = require('./property');

const defaultLimit = 10;
const defaultOffset = 1;
const defaultLoc = {
  location: 'Île-de-France, France',
  buy: 'Île-de-France, France',
};
const searchQueryWhitelist = [
  'sort',
  'listView',
  'limit',
  'page',
  'loc',
  'maxPrice',
  'typeOfProperty',
  'pieces',
  'point',
];
const typeOfAnnoncies = {
  [typeOfAnnonciesObj.buy]: 'buy',
  [typeOfAnnonciesObj.location]: 'location',
};
const singleTypes = Object.values(typeOfAnnoncies);
const pages = {
  dashboard: '/dashboard',
  single: '/dashboard/property',
};
const singlePath = ({ typeOfAnnonce, _id }) =>
  `${pages.single}/${typeOfAnnoncies[typeOfAnnonce]}/${_id}`;

module.exports = {
  pages,
  defaultLimit,
  defaultOffset,
  defaultLoc,
  searchQueryWhitelist,
  singlePath,
  singleTypes,
};
