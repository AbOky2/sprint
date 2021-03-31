const ucfirst = (name = '') => name.charAt(0).toUpperCase() + name.slice(1);
const pick = (object, keys) =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }

    return obj;
  }, {});
const stringToDate = (str) => {
  const dateParts =  str.split("/");
  if (!dateParts.length)
    null;
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
}
module.exports = {
  ucfirst,
  stringToDate,
  pick
};
