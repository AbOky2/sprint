const client = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_TOKEN } = require('../../config');

module.exports = client(TWILIO_ACCOUNT_SID, TWILIO_TOKEN).messages;
