const twilio = require('twilio');
const libphonenumber = require('libphonenumber-js');
const { TWILIO_ACCOUNT_SID, TWILIO_TOKEN } = require('../../config');

module.exports = {
  check: (phone) => {
    try {
      const data = libphonenumber.parsePhoneNumberFromString(phone, 'FR');
      return data;
    } catch (err) {
      return err;
    }
  },
  messages: twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN).messages,
};
