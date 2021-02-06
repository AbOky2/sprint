const { format, differenceInYears } = require('date-fns');

const toDate = (date) => format(new Date(date), 'dd/MM/yyyy');
const isMajor = (age) => differenceInYears(new Date(age), new Date()) >= 18;
const ucfirst = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const isValidateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};
const toFormData = (form = {}) => {
  const formData = new FormData();

  Object.keys(form).forEach((key) => formData.append(key, form[key]));

  return formData;
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
  ucfirst,
  toFormData,
  isValidateEmail,
  pick,
};
