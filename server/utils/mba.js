const csv = require('csv-parser');
const fs = require('fs');
// const NodeGeocoder = require('node-geocoder');
const path = require('path');
const { pick } = require('../../helpers/convertAndCheck');
const { propertiesHeader, filteredProperties } = require('../../helpers/property');
const { PropertieModel } = require('../models');
const logger = require('../logs');

// const options = {
//   provider: 'openstreetmap',
// };
// const geocoder = NodeGeocoder(options);

const gepublicPropertiesFolder = path.resolve(__dirname, '../../public/properties');
const lot_refs = [];
// Using callback
const numberTypes = ['price'];
const readMba = () => {
  const datas = [];

  fs.createReadStream(`${gepublicPropertiesFolder}/Annonces.csv`, {
    encoding: 'utf-8',
  })
    .pipe(csv())
    .on('data', (data) => datas.push(data))
    .on('end', async () => {
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
          propertiesHeader.forEach((key, i) => {
            const index = i - 1;
            const res = result[index]?.trim();

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
              //     console.log(address, i);
              //     const [{ latitude, longitude }] = await geocoder.geocode(address);

              //     newResult.lnt = latitude;
              //     newResult.lat = longitude;
              //     console.log(latitude, longitude);
              //   } catch (error) {
              //     console.log(error);
              //   }
              // }
            } else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
            else {
              newResult[key] = res;
            }
          });
          // eslint-disable-next-line no-unused-expressions
          Array.from({ length: 20 }, (_, j) => `picture_${j + 1}`).forEach((e) => {
            if (!newResult[e]) return;
            try {
              if (fs.existsSync(`${gepublicPropertiesFolder}/${newResult[e]}`))
                pictures.push(`/properties/${newResult[e]}`);
            } catch (err) {
              console.error(`----------${err}`);
            }
          });
          // if (!pictures.length) return;

          if (!pictures.length) pictures.push('/properties/no-pictures.jpg');
          const data = pick(newResult, filteredProperties);

          data.pictures = pictures;
          r.push(data);
        });
        await PropertieModel.create(r);
      } catch (err) {
        if (err.code) {
          logger.info('Updated properties', err);
        }
      }
    });
};

module.exports = readMba;
