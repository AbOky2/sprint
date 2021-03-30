const defaultLimit = 6;
const defaultOffset = 1;
const defaultLoc = {
  location: 'Paris, France',
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
];
const pages = {
  dashboard: '/dashboard',
};
module.exports = {
  pages,
  defaultLimit,
  defaultOffset,
  defaultLoc,
  searchQueryWhitelist,
};
