const csv = require('csv-parser');
const fs = require('fs');
// const NodeGeocoder = require('node-geocoder');
const path = require('path');
const { result } = require('lodash');
const { pick } = require('../../helpers/convertAndCheck');
const {
  propertiesHeader,
  typeOfAnnoncies,
  residencePropertiesHeader,
  residenceLotsPropertiesHeader,
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
const lot_refs = [];
// Using callback
const numberTypes = ['price', 'floor', 'surface'];
const readMba = () => {
  const datas = [];
  const customMap = ({
    typeOfAnnonce,
    fileName,
    header,
    pictureNb,
    lots = {},
    encoding = 'binary',
  }) => {
    fs.createReadStream(`${gepublicPropertiesFolder}/${fileName}.csv`, { encoding })
      .pipe(csv())
      .on('data', (data) => datas.push(data))
      .on('end', async () => {
        const entries = [];
        try {
          const r = [];
          datas.forEach((obj) => {
            const pictures = [];
            const newResult = {};
            const result = Object.keys(obj)
              .reduce((res, v) => res.concat(obj[v]), '')
              .replace(/"/g, '')
              .split('!#');
            // eslint-disable-next-line no-return-assign

            const advantages = [];
            header.forEach((key, i) => {
              const index = i - 1;
              const res = result[index]?.trim();

              if (key === 'lot_ref') {
                if (!res || res.length < 1 || lot_refs.includes(res)) return;
                lot_refs.push(res);
              }
              // console.log('okkk----', key);
              if (numberTypes.includes(key)) {
                newResult[key] = parseInt(res, 10);
              } else if (key === 'address') {
                newResult[key] = res;
                // if (i < 1) {
                //   i += 1;
                //   try {
                //     console.log(address, i);
                //     const [{ latitude, longitude }] = await geocoder.geocode(address);

                //     newResult.lnt = latitude;
                //     newResult.lat = longitude;
                //     console.log(latitude, longitude);
                //   } catch (error) {
                //     console.log(error);
                //   }
                // }
              } else if (key.includes(comodityDivider) && res === 'True') {
                advantages.push(key.split(comodityDivider)[1]);
              } else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
              else {
                newResult[key] = res;
              }
            });
            // eslint-disable-next-line no-unused-expressions
            Array.from({ length: pictureNb }, (_, j) => `picture_${j + 1}`).forEach((e) => {
              if (!newResult[e]) return;
              try {
                if (fs.existsSync(`${gepublicPropertiesFolder}/${newResult[e]}`))
                  pictures.push(`/properties/${newResult[e]}`);
              } catch (err) {
                console.error(`----------${err}`);
              }
            });
            // console.log(advantage, pictures.length);
            if (!pictures.length) return;
            // if (!pictures.length) pictures.push('/properties/no-pictures.jpg');
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
                data.advantage = advantages;
                data.typeOfAnnonce = typeOfAnnonce;
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
  customMap({
    encoding: 'utf-8',
    typeOfAnnonce: typeOfAnnoncies[1],
    fileName: 'residences',
    header: residencePropertiesHeader,
    pictureNb: 20,
    lots: {
      fileName: 'lots_residences',
      header: residenceLotsPropertiesHeader,
      encoding: 'utf-8',
    },
  });
};

module.exports = readMba;
