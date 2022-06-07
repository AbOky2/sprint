const NodeGeocoder = require('node-geocoder');
const axios = require('axios');
const logger = require('../logs');
const { GOOGLE_GEOLOCATION, HERE_API_KEY } = require('../config');

const options = {
  provider: 'google',
  apiKey: GOOGLE_GEOLOCATION,
};
const getStations = async ({ lng = '49.0477928', lat = '2.0329494' } = {}) => {
  try {
    const res = await axios.get(
      `https://transit.ls.hereapi.com/v3/stations/by_geocoord.json?center=${lat}%2C${lng}&radius=500&max=30&apiKey=${HERE_API_KEY}`
    );
    if (
      res &&
      res.data &&
      res.data.Res &&
      res.data.Res.Stations &&
      res.data.Res.Stations.Stn
    ) {
      const stations = res.data.Res.Stations.Stn;

      return stations.reduce((acc, curr) => {
        const transports = curr.Transports.Transport;

        transports.forEach((e) => {
          console.log(e);
          const r = acc[e.mode];
          if (r) {
            if (!r.find((a) => a.name == e.name)) acc[e.mode] = [...r, e];
          } else acc[e.mode] = [e];
        });
        return acc;
      }, {});
    }
    logger.error(res.data.Res.Message);
  } catch (error) {
    logger.error('No station found', error);
  }
};
const geocoder = NodeGeocoder(options);
module.exports = { geocoder, getStations };
