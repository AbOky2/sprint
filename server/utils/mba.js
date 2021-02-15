const csv = require('csv-parser');
const fs = require('fs');
// const NodeGeocoder = require('node-geocoder');
const path = require('path');
const { result } = require('lodash');
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

// const options = {
//   provider: 'openstreetmap',
// };
// const geocoder = NodeGeocoder(options);

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
const readMba = () => {
  const datas = [];
  const customMap = async ({ typeOfAnnonce, fileName, header, lots = {}, encoding = 'binary' }) => {
    const lot_refs = [];
    fs.createReadStream(`${gepublicPropertiesFolder}/${fileName}.csv`, { encoding })
      .pipe(csv())
      .on('data', (data) => datas.push(data))
      .on('end', async () => {
        const entries = [];
        try {
          const r = [];
          datas.forEach((obj) => {
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
                if (!res || res.length < 1 || lot_refs.includes(res)) return;
                lot_refs.push(res);
              }
              if (numberTypes.includes(key)) {
                newResult[key] = parseInt(res, 10);
              } else if (key === 'address') {
                newResult[key] = res;
                // if (i < 1) {
                //   i += 1;
                //   try {
                //     const [{ latitude, longitude }] = await geocoder.geocode(address);

                //     newResult.lnt = latitude;
                //     newResult.lat = longitude;
                //   } catch (error) {
                //     console.log(error);
                //   }
                // }
                // if (key.includes(comodityDivider)) console.log(res);
              } else if (key.includes(comodityDivider) && res === 'True') {
                advantages.push(key.split(comodityDivider)[1]);
              } else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
              else {
                newResult[key] = res;
              }
            });

            const pictures = getPictures(newResult);

            const data = pick(newResult, filteredProperties);
            data.advantage = advantages;
            data.typeOfAnnonce = typeOfAnnonce;
            data.lots = [];
            data.pictures = pictures;
            r.push(data);
          });
          entries.push(...r);
          // await PropertieModel.create(r);
        } catch (err) {
          if (err.code) {
            logger.info('Updated properties', err);
          }
        }
        fs.createReadStream(`${gepublicPropertiesFolder}/${lots.fileName}.csv`, {
          encoding: lots.encoding,
        })
          .pipe(csv())
          .on('data', (data) => datas.push(data))
          .on('end', async () => {
            try {
              const r = [];
              datas.forEach((obj) => {
                const newResult = {};
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
                    newResult[key] = parseInt(res, 10);
                  } else if (key.includes(comodityDivider) && res === 'True') {
                    advantages.push(key.split(comodityDivider)[1]);
                  } else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
                  else {
                    newResult[key] = res;
                  }
                });

                const data = newResult;
                // if (isNaN(data.price)) console.log('no  ', data.residence_ref);
                // else console.log('yes ', data.residence_ref);
                data.advantage = advantages;
                data.typeOfAnnonce = typeOfAnnonce;
                // console.log(entries[0].lot_ref, data.residence_ref);
                const lotIndex = entries.findIndex((elem) => elem.lot_ref === data.residence_ref);

                if (lotIndex >= 0) {
                  entries[lotIndex].lots.push(data);
                  if (!entries[lotIndex].price) entries[lotIndex].price = data.price;
                  else if (entries[lotIndex].price > data.price)
                    entries[lotIndex].price = data.price;

                  if (!entries[lotIndex].minSurface) entries[lotIndex].minSurface = data.surface;
                  else if (entries[lotIndex].minSurface > data.surface)
                    entries[lotIndex].minSurface = data.surface;

                  if (!entries[lotIndex].maxSurface) entries[lotIndex].maxSurface = data.surface;
                  else if (entries[lotIndex].maxSurface < data.surface)
                    entries[lotIndex].maxSurface = data.surface;

                  if (!entries[lotIndex].minPieces) entries[lotIndex].minPieces = data.pieces;
                  else if (entries[lotIndex].minPieces > data.pieces)
                    entries[lotIndex].minPieces = data.pieces;

                  if (!entries[lotIndex].maxPieces) entries[lotIndex].maxPieces = data.pieces;
                  else if (entries[lotIndex].maxPieces < data.pieces)
                    entries[lotIndex].maxPieces = data.pieces;
                }
              });
              await PropertieModel.create(entries);
            } catch (err) {
              if (err.code) {
                logger.info('Updated properties', err);
              }
            }
            console.log('finish');
          });
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
