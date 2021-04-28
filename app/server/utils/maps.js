const NodeGeocoder = require('node-geocoder');
const navitia = require('navitia');
const { GOOGLE_GEOLOCATION } = require('../../config');

const options = {
  provider: 'google',
  apiKey: GOOGLE_GEOLOCATION,
};

const geocoder = NodeGeocoder(options);
module.exports = geocoder;
