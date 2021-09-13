const NodeGeocoder = require('node-geocoder');
const { GOOGLE_GEOLOCATION } = require('../../config');
const departments = require('../../helpers/france-maps');

const options = {
  provider: 'google',
  apiKey: GOOGLE_GEOLOCATION,
};
const geocoder = NodeGeocoder(options);

const getZoom = (data) => {
  if (!data) return {};
  const level2long =
    data && data.administrativeLevels
      ? data.administrativeLevels.level2long
      : null;
  const dep = departments[level2long] || null;

  if (data.city) return { adressType: 'city', zoom: 13, coord: dep };
  if (level2long)
    return {
      zoom: 11,
      adressType: 'departement',
      number: dep.properties.code,
      coord: dep,
    };
  return { adressType: 'region', zoom: 9 };
};
const geoQuery = ({
  pieces,
  maxPrice,
  near,
  $maxDistance,
  typeOfAnnonce,
  $geometry,
}) => ({
  $and: [
    pieces.length > 0 ? { pieces: { $in: pieces } } : {},
    maxPrice >= 0 ? { price: { $lte: parseInt(maxPrice, 10) } } : {},
    near.length > 0
      ? {
          loc: {
            ...($geometry
              ? {
                  $geoIntersects: {
                    $geometry,
                  },
                }
              : {
                  $nearSphere: {
                    $maxDistance,
                    $geometry: {
                      type: 'Point',
                      coordinates: near,
                    },
                  },
                }),
          },
        }
      : { loc: { $ne: null } },
    { price: { $ne: null } },
    { available: true },
    { typeOfAnnonce },
  ],
});

module.exports = {
  geocoder,
  find: async (loc) => {
    const g = await geocoder.geocode({
      address: loc,
      country: 'france',
    });
    const geo = g[0];

    return {
      near: [geo.longitude, geo.latitude],
      geo,
      ...getZoom(geo),
    };
  },
  geoQuery,
};
