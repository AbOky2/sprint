const { format, isBefore, differenceInYears, getQuarter } = require('date-fns');

const isArray = (arr) => Array.isArray(arr);
const isObject = (arg) => (typeof arg === 'object' || typeof arg === 'function') && arg !== null;
const toDate = (date) => format(new Date(date), 'dd/MM/yyyy');
const isMajor = (age) => differenceInYears(new Date(age), new Date()) >= 18;
const ucfirst = (name = '') => name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
const isValidateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};
const stringToDate = (str = '') => {
  const dateParts = str.split('/');
  if (!dateParts.length) null;
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};
const esc = encodeURIComponent;
const toQueryParams = (params) =>
  Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');

const toFormData = (form = {}) => {
  const formData = new FormData();

  Object.keys(form).forEach((key) => formData.append(key, form[key]));

  return formData;
};
const toggleArray = (array, name) => {
  let found = false;

  if (!isArray(array) || (!name && name !== '0')) return array;

  const data = array.filter((elem) => {
    if (elem === name) found = true;

    return elem !== name;
  });

  if (!found) data.push(name);
  return data;
};
const getDateQuarter = (str) => {
  const date = stringToDate(str);
  return `${getQuarter(date)}ème trimestre ${date.getFullYear()}`;
};
const locationAvailableDate = (availableDate, contractEndDate) => {
  const date = stringToDate(availableDate);
  const endDate = stringToDate(contractEndDate);
  if ((!date && !endDate) || isBefore(endDate, new Date())) return 'Disponible';
  return `Loué jusqu'au ${contractEndDate}`;
};
const spaceCurrency = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const toggleArrayOfObj = (arr, item, getValue = (e) => e) => {
  const filtered = arr.filter((i) => String(getValue(i)) !== String(getValue(item)));
  if (arr.length === filtered.length) return [...arr, item];
  return filtered;
};

const pick = (object, keys) =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }

    return obj;
  }, {});

module.exports = {
  toDate,
  isMajor,
  isArray,
  isObject,
  stringToDate,
  ucfirst,
  toFormData,
  getDateQuarter,
  locationAvailableDate,
  isValidateEmail,
  pick,
  toggleArray,
  toggleArrayOfObj,
  toQueryParams,
  spaceCurrency,
};
