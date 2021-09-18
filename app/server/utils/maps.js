const request = require('request-promise');
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
  const { level1long, level2long } = data.administrativeLevels;
  const key = level2long || level1long;
  const dep = departments[key] || null;

  if (data.city) return { adressType: 'city', zoom: 13, coord: dep };
  if (level2long)
    return {
      zoom: 11,
      adressType: 'departement',
      number: dep.properties.code,
      coord: dep,
    };
  return { adressType: 'region', zoom: 9, coord: dep };
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
    let cityCoord;
    let near = [geo.longitude, geo.latitude];

    if (geo.city) {
      let res = await request({
        uri: `https://geo.api.gouv.fr/communes?nom=${geo.city}&fields=centre,departement,contour&format=json&geometry=contour`,
        json: true,
      });
      if (res && res[0]) {
        res = res.find((elem) => elem.nom == geo.city) || res[0];
        cityCoord = res.contour;
        near =
          res.center && res.center.coordinates
            ? `res.center.coordinates`
            : near;
      }
    }

    return {
      near,
      geo,
      ...getZoom(geo),
      cityCoord,
    };
  },
  geoQuery,
};
