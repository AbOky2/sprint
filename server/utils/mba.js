const csv = require('csv-parser');
const fs = require('fs');
// const NodeGeocoder = require('node-geocoder');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
const { pick } = require('../../helpers/convertAndCheck');
const {
  programsHeader,
  lotsHeader,
  typeOfAnnoncies,
  residenceHeader,
  lotsResidencesHeader,
  filteredProperties,
  comodityDivider,
} = require('../../helpers/property');
const { PropertieModel } = require('../models');
const logger = require('../logs');

const options = {
  provider: 'google',
  apiKey: 'AIzaSyC59sI-cU0pmzMBVVtxBAcJeokj0S8ra3s', // for Mapquest, OpenCage, Google Premier
};

const geocoder = NodeGeocoder(options);

const gepublicPropertiesFolder = path.resolve(__dirname, '../../public/properties');

const getPictures = (data) => {
  const pictures = [];
  Array.from({ length: 20 }, (_, j) => `picture_${j + 1}`).forEach((e) => {
    if (!data[e]) return;
    try {
      if (fs.existsSync(`${gepublicPropertiesFolder}/${data[e]}`))
        pictures.push(`/properties/${data[e]}`);
    } catch (err) {
      console.error(`----------${err}`);
    }
  });
  return pictures;
};
// Using callback
const numberTypes = ['price', 'floor', 'surface', 'pieces'];
// const data = newResult;
// data.advantage = advantages;
// data.typeOfAnnonce = typeOfAnnonce;
// const lotIndex = entries.findIndex((elem) => elem.lot_ref === data.residence_ref);

// if (lotIndex >= 0) {
//   entries[lotIndex].lots.push(data);
//   if (!entries[lotIndex].price) entries[lotIndex].price = data.price;
//   else if (entries[lotIndex].price > data.price) entries[lotIndex].price = data.price;

//   if (!entries[lotIndex].minSurface) entries[lotIndex].minSurface = data.surface;
//   else if (entries[lotIndex].minSurface > data.surface) entries[lotIndex].minSurface = data.surface;

//   if (!entries[lotIndex].maxSurface) entries[lotIndex].maxSurface = data.surface;
//   else if (entries[lotIndex].maxSurface < data.surface) entries[lotIndex].maxSurface = data.surface;

//   if (!entries[lotIndex].minPieces) entries[lotIndex].minPieces = data.pieces;
//   else if (entries[lotIndex].minPieces > data.pieces) entries[lotIndex].minPieces = data.pieces;

//   if (!entries[lotIndex].maxPieces) entries[lotIndex].maxPieces = data.pieces;
//   else if (entries[lotIndex].maxPieces < data.pieces) entries[lotIndex].maxPieces = data.pieces;
// }
const readMba = () => {
  const lotsDatas = [];
  const datas = [];
  const customMap = async ({ typeOfAnnonce, fileName, header, lots = {}, encoding = 'binary' }) => {
    fs.createReadStream(`${gepublicPropertiesFolder}/${lots.fileName}.csv`, {
      encoding: lots.encoding,
    })
      .pipe(csv())
      .on('data', (data) => lotsDatas.push(data))
      .on('end', async () => {
        try {
          const lotList = [];
          lotsDatas.forEach((obj) => {
            const newLot = {};
            const result = Object.keys(obj)
              .reduce((res, v) => res.concat(obj[v]), '')
              .replace(/"/g, '')
              .split('!#');
            // eslint-disable-next-line no-return-assign

            const advantages = [];
            lots.header.forEach((key, i) => {
              const index = i - 1;
              const res = result[index]?.trim();

              if (numberTypes.includes(key)) {
                newLot[key] = parseInt(res, 10);
              } else if (key.includes(comodityDivider) && res === 'True') {
                advantages.push(key.split(comodityDivider)[1]);
              } else if (key === 'isNewProperty') newLot[key] = res === 'Neuf';
              else {
                newLot[key] = res;
              }
            });
            lotList.push(newLot);
          });

          const lotRefs = [];
          fs.createReadStream(`${gepublicPropertiesFolder}/${fileName}.csv`, { encoding })
            .pipe(csv())
            .on('data', (data) => datas.push(data))
            .on('end', async () => {
              const entries = [];
              try {
                datas.forEach((obj, i) => {
                  setTimeout(
                    async (obj) => {
                      const newResult = {};
                      const result = Object.keys(obj)
                        .reduce((res, v) => res.concat(obj[v]), '')
                        .replace(/"/g, '')
                        .split('!#');
                      const advantages = [];
                      header.forEach((key, i) => {
                        const index = i - 1;
                        const res = result[index]?.trim();
                        // console.log(key, res);
                        if (key === 'lot_ref') {
                          if (!res || res.length < 1 || lotRefs.includes(res)) return;
                          lotRefs.push(res);
                        }
                        if (numberTypes.includes(key)) {
                          newResult[key] = parseInt(res, 10);
                        } else if (key.includes(comodityDivider) && res === 'True') {
                          advantages.push(key.split(comodityDivider)[1]);
                        } else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
                        else {
                          newResult[key] = res;
                        }
                      });

                      const pictures = getPictures(newResult);

                      const foundElement = await PropertieModel.findByRef(newResult.lot_ref);
                      const data = pick(newResult, filteredProperties);
                      if ((!foundElement && newResult.lot_ref, newResult.address)) {
                        console.log(newResult.address);
                        const geo = await geocoder.geocode({
                          address: newResult.address,
                          zipcode: newResult.postal,
                          country: 'france',
                        });
                        data.advantage = advantages;
                        data.typeOfAnnonce = typeOfAnnonce;
                        data.lots = [];
                        data.pictures = pictures;
                        if (geo && geo[0]) {
                          data.fullAddress = geo[0].formattedAddress;
                          data.loc = {
                            type: 'Point',
                            coordinates: [geo[0].longitude, geo[0].latitude],
                          };
                        }
                        const { elem } = await PropertieModel.add(data);
                        console.log(elem);
                      } else console.log('found', data.lot_ref);
                      console.log('finish');
                    },
                    900,
                    obj,
                  );
                });
              } catch (err) {
                if (err.code) {
                  logger.info('Updated properties', err);
                }
              }
            });
        } catch (err) {
          if (err.code) {
            logger.info('Updated properties', err);
          }
          console.log('err', err);
        }
      });
  };
  (async () => {
    await customMap({
      encoding: 'binary',
      typeOfAnnonce: typeOfAnnoncies[0],
      fileName: 'Programmes',
      header: programsHeader,
      lots: {
        fileName: 'lots',
        header: lotsHeader,
        encoding: 'utf-8',
      },
    });
    await customMap({
      encoding: 'utf-8',
      typeOfAnnonce: typeOfAnnoncies[1],
      fileName: 'residences',
      header: residenceHeader,
      lots: {
        fileName: 'lots_residences',
        header: lotsResidencesHeader,
        encoding: 'utf-8',
      },
    });
  })();
};

module.exports = readMba;
