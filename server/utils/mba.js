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
const maps = require('./maps');

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

const getExtraInfo = (annonce = {}, lotList = []) => {
  const data = { ...annonce, lots: [] };

  data.lots = lotList
    .filter((elem) => elem.residence_ref === data.lot_ref)
    .map((elem) => {
      if (!data.price) data.price = elem.price;
      else if (data.price > elem.price) data.price = elem.price;

      if (!data.minSurface) data.minSurface = elem.surface;
      else if (data.minSurface > elem.surface) data.minSurface = elem.surface;

      if (!data.maxSurface) data.maxSurface = elem.surface;
      else if (data.maxSurface < elem.surface) data.maxSurface = elem.surface;

      if (!data.minPieces) data.minPieces = elem.pieces;
      else if (data.minPieces > elem.pieces) data.minPieces = elem.pieces;

      if (!data.maxPieces) data.maxPieces = elem.pieces;
      else if (data.maxPieces < elem.pieces) data.maxPieces = elem.pieces;
      return elem;
    });
  // console.log(data);
  return data;
};
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
                      const data = getExtraInfo(pick(newResult, filteredProperties), lotList);
                      data.advantage = advantages;
                      data.typeOfAnnonce = typeOfAnnonce;
                      data.pictures = pictures;
                      // console.log(extra.minPieces, extra.maxPieces, extra.lots.length);
                      if (!foundElement && newResult.lot_ref && newResult.address) {
                        // const geo = await maps.geocode({
                        //   address: newResult.address,
                        //   zipcode: newResult.postal,
                        //   country: 'france',
                        // });
                        // if (geo && geo[0]) {
                        //   data.fullAddress = geo[0].formattedAddress;
                        //   data.loc = {
                        //     type: 'Point',
                        //     coordinates: [geo[0].longitude, geo[0].latitude],
                        //   };
                        //   await PropertieModel.add(data);
                        // }
                      } else {
                        if (foundElement && foundElement._id)
                          await PropertieModel.updateById(foundElement._id, data);
                        console.log('found', foundElement?._id);
                      }
                      console.log('finish');
                    },
                    10000,
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
