const fs = require('fs');
const sizeOf = require('image-size');
const {  addMonths, isBefore, isAfter } = require('date-fns')
const { pick, stringToDate } = require('../helpers/convertAndCheck');
const {
  buyDatas,
  rentDatas,
  vatCode,
  defaultVat,
  filteredProperties,
  comodityDivider,
  typeOfProperties
} = require('../helpers/property');
const PropertieModel = require('../models/Propertie');
const logger = require('../logs');
const maps = require('./maps');
const {
  PROPERTIES_DIR,
PUBLIC_PROPERTIES_DIR,
} = require('../config');


const getPictures = (data) => {
  const pictures = [];
  Array.from({ length: 20 }, (_, j) => `picture_${j + 1}`).forEach(async (e) => {
    if (!data[e]) return;
    try {
      const imagePath = `${PUBLIC_PROPERTIES_DIR}/${data[e]}`;
      if (fs.existsSync(imagePath)) {
        const { width, height } = sizeOf(imagePath);
        if (width > 100 && height > 100) {
          pictures.push(`/${PROPERTIES_DIR}/${data[e]}`);
        }
      }
    } catch (err) {
      logger.error(`----------${err}`);
    }
  });
  return pictures;
};
// Using callback
const intNumbers = ['price', 'floor', 'pieces'];
const floatNumbers = ['surface'];
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
    data.pictures = [...data.pictures, ...elem.pictures];
    data.advantages = elem.advantages.reduce((acc, curr)=> acc.includes(curr) ? acc: [...acc, curr], data.advantages)
    return elem;
  });
  return data;
};

const getLotsList = (list, lots) => list.reduce((acc, curr) => {
  const newLot = {};
  const result = Object.keys(curr)
    .reduce((res, v) => res.concat(curr[v]), '')
    .replace(/"/g, '')
    .split('!#');

  const advantages = [];
  lots.header.forEach((key, i) => {
    const index = i - 1;
    const res = result[index] ? result[index].trim() : '';

    if (intNumbers.includes(key)) newLot[key] = parseInt(res, 10);
    else if (floatNumbers.includes(key)) newLot[key] = parseFloat(res);
    else if (
      (key.includes(comodityDivider) && res === 'OUI') ||
      (key.includes(comodityDivider) &&
      (key.includes('Balcon') && res))
    ) {
      advantages.push(key.split(comodityDivider)[1]);
    } else if (key === 'isNewProperty') newLot[key] = res === 'Neuf';
    else {
      newLot[key] = res;
    }
    if (key === 'pieces' && lots.piecesMatch && lots.piecesMatch[res]) {
      newLot.pieces = lots.piecesMatch[res].nb;
      newLot.piecesType = lots.piecesMatch[res].name;
    } else if (key === 'floor' && lots.floorMatch)
      newLot[key] = lots.floorMatch[res];
    if (
      key === 'file' &&
      res &&
      fs.existsSync(`${PUBLIC_PROPERTIES_DIR}/${res}`)
    ) {
      newLot.file = `/properties/${res}`;
    } else newLot.file = null;
  });
  newLot.advantages = advantages;
  newLot.pictures = getPictures(newLot);
  let isAvailable = true;

  if (lots.isLocation) {
    let contract_end_date = newLot.contract_end_date || null;
    let available_date = newLot.available_date || null;
    const newDate = new Date();
    const endDate = addMonths(newDate, 3);
    isAvailable = false

    if (contract_end_date)
      contract_end_date = stringToDate(contract_end_date);
    if (available_date)
      available_date = stringToDate(available_date);
    if ((isBefore(contract_end_date, endDate) && ((!contract_end_date && !available_date)||
    ((isBefore(newDate, contract_end_date) && !available_date) ||
    (isAfter(newDate, contract_end_date) && !available_date))))
    )
      isAvailable = true;
  }

  return newLot.surface > 1 && isAvailable ? [...acc, newLot] : acc;
}, []);

const readMba = () =>  {
  const lotRefs = [];

  const customMap = async ({
    typeOfAnnonce,
    fileName,
    header,
    lots = {},
    encoding = 'binary',
  }, extraProgramsList) => {
    const returnLog = (dataArr, i, msg)=> {
      if (i === dataArr.length - 1)
          logger.info(typeOfAnnonce, 'added')
      if (msg)
      logger.error(msg)
    }
    // lot
    const readedLots = fs.readFileSync(
      `${PUBLIC_PROPERTIES_DIR}/${lots.fileName}.csv`,
      { encoding: lots.encoding }
    );
    if (readedLots) {
      const lotList = getLotsList(readedLots.split('\n'), lots)

      // lot parents
      const readedDatas = fs.readFileSync(
        `${PUBLIC_PROPERTIES_DIR}/${fileName}.csv`,
        { encoding }
      );
      if (readedLots) {
        const readedDatasArray = readedDatas.split('\n');
        const interval = 50 * 100;
        readedDatasArray.forEach((obj, i) => {
          setTimeout(async (obj, i) => {
            const newResult = {};
            const result = Object.keys(obj)
              .reduce((res, v) => res.concat(obj[v]), '')
              .replace(/"/g, '')
              .split('!#');

            const advantages = [];
            header.forEach((key, x) => {
              const index = x - 1;
              const res = result[index] ? result[index].trim() : null;
              if (!res)
                return ;
              if (key === 'lot_ref') {
                if (lotRefs.includes(res)) return returnLog(readedDatasArray, i, `already exist, index: ${index}, result: ${result}, fileName: ${fileName}`);
                lotRefs.push(res);
              }
              if (intNumbers.includes(key)) newResult[key] = parseInt(res, 10);
              else if (floatNumbers.includes(key)) newResult[key] = parseFloat(res);
              else if (key === 'is_house' && res === 'OUI')
                newResult.typeOfProperty = 'Maison';
              else if (key === 'is_appart' && res === 'OUI')
                newResult.typeOfProperty = 'Appartement';
              if (
                key.includes(comodityDivider) &&
                (res === 'True' || res === 'OUI')
              )
                advantages.push(key.split(comodityDivider)[1]);
              else if (key === 'address')
                newResult[key] = res.replace(/\s+/g,' ').replace(/^0+/, '').trim();
              else if (key === 'isNewProperty') newResult[key] = res === 'Neuf';
              else {
                newResult[key] = res;
              }
            });
            if (extraProgramsList) {
              const foundExtraProgram = extraProgramsList.find(e=>e.program_ref === newResult.program_ref);
              newResult.vat = foundExtraProgram ? foundExtraProgram.vat: defaultVat
            }
            if (!newResult.lot_ref)
              return returnLog(readedDatasArray, i);
            newResult.pictures = getPictures(newResult);
            newResult.advantages = advantages;
            newResult.typeOfAnnonce = typeOfAnnonce;
            const data = getExtraInfo(pick(newResult, filteredProperties), lotList);
            if (!data || !data.lots.length)
            return returnLog(readedDatasArray, i, `lot_ref: ${data.lot_ref}; typeOfAnnonce: ${lots.fileName}; lots length: ${data.lots.length}, ${lotList.length}; 'data or not found'`);
            else if (!data.pictures.length || !data.address)
              return returnLog(readedDatasArray, i, `lot_ref: ${data.lot_ref}; typeOfAnnonce: ${lots.fileName}; 'pictures found'`);
            else if (!data.address)
              return returnLog(readedDatasArray, i, `lot_ref: ${data.lot_ref}; typeOfAnnonce: ${lots.fileName}; address: ${data.address}; 'address found'`);
            else if (buyDatas.fileName === fileName && !typeOfProperties.includes(newResult.typeOfProperty))
              return returnLog(readedDatasArray, i, `lot_ref: ${data.lot_ref}; typeOfProperty: ${lots.typeOfProperty}; address: ${data.address}; 'Invalid type of property'`);
            
              const foundElement = await PropertieModel.findByRef(data.lot_ref);
              if (!foundElement || !foundElement._id) {
                const geo = await maps.geocode({
                  address: data.address,
                  zipcode: data.postal,
                  countryCode: 'fr',
                });
                if (geo && geo[0] && geo[0].formattedAddress) {
                  console.log(geo)
                  data.fullAddress = geo[0].formattedAddress;
                  data.loc = {
                    type: 'Point',
                    coordinates: [geo[0].longitude, geo[0].latitude],
                  };
                  await PropertieModel.add(data);
                  logger.info(`${i}, 'added'; lot_ref: ${data.lot_ref}; typeOfAnnonce: ${data.typeOfAnnonce};`)
                }else
                returnLog(readedDatasArray, i, `lot_ref: ${data.lot_ref}; address: ${data.postal} | ${data.address};  geo: ${geo}; typeOfAnnonce: ${data.typeOfAnnonce}; 'address not found'`)
              } else if (foundElement && foundElement._id) {
                await PropertieModel.updateById(foundElement._id, data);
                logger.info(`${i}, 'updated'; lot_ref: ${data.lot_ref}; typeOfAnnonce: ${data.typeOfAnnonce};`)
              }
              logger.info(`${i} 'done'`)
          }, interval * i, obj, i);
        });
      }
    } else {
      logger.error(`${PUBLIC_PROPERTIES_DIR}/${lots.fileName}.csv not found`);
    }
  };
  (async () => {
    const readedExtraPrograms = fs.readFileSync(
      `${PUBLIC_PROPERTIES_DIR}/${buyDatas.extraPrograms.fileName}.csv`,
      { encoding: buyDatas.extraPrograms.encoding }
    );
    let extraProgramsList = []
    if (readedExtraPrograms) {
      extraProgramsList = readedExtraPrograms.split('\n').reduce((acc, curr) => {
        const newLot = {};
        const result = Object.keys(curr)
          .reduce((res, v) => res.concat(curr[v]), '')
          .replace(/"/g, '')
          .split('!#');

          buyDatas.extraPrograms.header.forEach((key, x) => {
            const index = x - 1;
            const res = result[index] ? result[index].trim() : null;
            if (!res)
              return ;
            if (key === 'vat')
              newLot[key] = vatCode.hasOwnProperty(res) ? vatCode[res] : defaultVat;
            else
              newLot[key] = res;
          });
        return [...acc, newLot];
        }, []);
      }
    // await customMap(buyDatas, extraProgramsList);
    await customMap(rentDatas);
  })();
};

module.exports = readMba;
