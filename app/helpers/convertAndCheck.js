const { format, isBefore, differenceInYears, getQuarter } = require('date-fns');

const isArray = (arr) => Array.isArray(arr);
const isFn = (fn) => typeof fn === 'function';
const isObject = (arg) =>
  (typeof arg === 'object' || typeof arg === 'function') && arg !== null;
const toArr = (arg) => (isArray(arg) ? arg : [arg]);
const toDate = (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : '');
const isMajor = (age) => differenceInYears(new Date(age), new Date()) >= 18;
const ucfirst = (name = '') =>
  name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
const isValidateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
const queryParams = (url) =>
  `${url}?`
    .split('?')[1]
    .split('&')
    .reduce(
      (params, pair) =>
        ((key, val) => (key ? { ...params, [key]: val } : params))(
          ...`${pair}=`.split('=').map(decodeURIComponent)
        ),
      {}
    );

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
const spaceCurrency = (x) =>
  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : x;
const toggleArrayOfObj = (arr, item, getValue = (e) => e) => {
  const filtered = arr.filter(
    (i) => String(getValue(i)) !== String(getValue(item))
  );
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

const unPick = (object, keys) =>
  pick(
    object,
    Object.keys(object).filter((e) => !keys.includes(e))
  );
const stripTags = (text) => text.replace(/(<([^>]+)>)/gi, '');
const round10 = (val, expo) => {
  // Si l'exposant vaut undefined ou zero...
  if (typeof expo === 'undefined' || +expo === 0) {
    return Math.round(val);
  }
  let value = +val;
  const exp = +expo;
  // Si value n'est pas un nombre
  // ou si l'exposant n'est pas entier
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Décalage
  value = value.toString().split('e');
  value = Math.round(+`${value[0]}e${value[1] ? +value[1] - exp : -exp}`);
  // Re "calage"
  value = value.toString().split('e');
  return +`${value[0]}e${value[1] ? +value[1] + exp : exp}`;
};

module.exports = {
  isFn,
  toArr,
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
  unPick,
  toggleArray,
  toggleArrayOfObj,
  toQueryParams,
  queryParams,
  spaceCurrency,
  stripTags,
  round10,
};
