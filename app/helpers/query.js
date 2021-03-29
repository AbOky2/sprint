const defaultLimit = 6;
const defaultOffset = 1;
const searchQueryWhitelist = [
  'sort',
  'listView',
  'limit',
  'page',
  'loc',
  'maxPrice',
  'typeOfProperty',
];
const pages = {
  dashboard: '/dashboard',
};
module.exports = {
  pages,
  defaultLimit,
  defaultOffset,
  searchQueryWhitelist,
};
