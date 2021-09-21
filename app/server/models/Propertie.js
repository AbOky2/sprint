const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const DBModel = require('./Model');
const { typeOfAnnoncies, typeOfProperties } = require('../../helpers/property');

const maps = require('../utils/maps');

const { Schema } = mongoose;
const modelName = 'Propertie';

const mongoSchema = new Schema({
  pictures: { type: [String] },
  lots: { type: [Object] },
  lot_ref: { type: String, unique: true },
  postal: { type: String },
  city: { type: String },
  isNewProperty: { type: Boolean, default: false },
  available: { type: Boolean, default: false },
  unavalableReason: { type: String },
  country: { type: String },
  address: { type: String },
  fullAddress: { type: String },
  district: { type: String },
  heading: { type: String },
  description: { type: String },
  available_date: { type: String },
  typeOfAnnonce: { type: String, enum: typeOfAnnoncies },
  typeOfProperty: { type: String, enum: typeOfProperties },
  price: { type: Number },
  surface: { type: String },
  land_surface: { type: String },
  nb_rooms: { type: String },
  expenses: { type: String },
  advantage: { type: [String] },
  floor: { type: Number },
  minSurface: { type: Number },
  maxSurface: { type: Number },
  pieces: { type: [Number] },
  nb_pieces: { type: String },
  minPieces: { type: Number },
  maxPieces: { type: Number },
  nb_floors: { type: String },
  nb_bathrooms: { type: String },
  nb_washrooms: { type: String },
  nb_wc: { type: String },
  is_separate_wc: { type: String },
  south_orientation: { type: String },
  east_orientation: { type: String },
  west_orientation: { type: String },
  north_orientation: { type: String },
  nb_balcony: { type: String },
  elevator: { type: String },
  nb_parking: { type: String },
  digicode: { type: String },
  intercom: { type: String },
  guardian: { type: String },
  terrace: { type: String },
  phone: { type: String },
  contact: { type: String },
  email: { type: String },
  transportations: { type: Object },
  stations: { type: String },
  property_sub_type: { type: String },
  file: { type: String },
  loc: {
    type: { type: String },
    coordinates: [],
  },
});

class PropertieClass extends DBModel {
  static async newProperties() {
    const list = await this.find({
      isNewProperty: true,
      typeOfAnnonce: 'Location',
    })
      .sort('nb_pieces')
      .limit(150);
    return { list };
  }

  static async findByRef(lot_ref) {
    const element = await this.findOne({ lot_ref });

    return element;
  }

  static async publicSearch({ maxPrice, typeOfAnnonce, pieces = [], loc }) {
    const {
      geo = {},
      near,
      zoom = 12,
      adressType,
      cityCoord,
      coord,
      number,
    } = await maps.find(loc);
    const $maxDistance = 5000;
    const docs = await this.find(
      maps.geoQuery({
        pieces,
        maxPrice,
        near,
        $maxDistance,
        typeOfAnnonce,
        $geometry: cityCoord || (coord ? coord.geometry : null),
      }),
      null
    );

    const list = {
      ...(cityCoord
        ? {
            coord: {
              type: 'Feature',
              geometry: cityCoord,
              properties: {
                fillColor: '#113eb6',
                strokeWeight: 1,
              },
            },
          }
        : { coord }),
      docs,
      nbLotFound: docs.length,
      zoom,
      near: [near[1], near[0]],
      adressType,
    };
    const name =
      geo.administrativeLevels && geo.administrativeLevels.level2long
        ? geo.administrativeLevels.level2long
        : null;
    if (adressType === 'departement') list.department = { number, name: name };
    else if (geo.city && geo.administrativeLevels) {
      const department = await maps.find(name);
      const q = maps.geoQuery({
        pieces,
        maxPrice,
        near: department.near,
        $maxDistance,
        typeOfAnnonce,
        $geometry: department.coord ? department.coord.geometry : null,
      });
      const lotFound = await this.find(q, null);
      const docsIds = docs.map((e) => e._id + '') || [];

      list.docs = lotFound.sort((a, b) => {
        if (docsIds.includes(a._id + '')) return -1;
        else if (docsIds.includes(b._id + '')) return 1;
        return 0;
      });
      list.department = {
        name,
        number: department.number,
        coord: department.coord,
      };
    }

    return { list };
  }

  static async searchByPoint({
    maxPrice,
    typeOfAnnonce,
    pieces = [],
    loc,
    zoom,
  }) {
    const near = [loc.lat, loc.lng];
    const $maxDistance = (19 - zoom) * 10000;
    const list = {
      docs: await this.find(
        maps.geoQuery({
          pieces,
          maxPrice,
          near: [near[1], near[0]],
          $maxDistance,
          typeOfAnnonce,
        })
      ),
      near,
      zoom,
    };

    return { list };
  }
}

PropertieClass.name = modelName;
mongoSchema.index({ loc: '2dsphere' });
mongoSchema.loadClass(PropertieClass);
mongoSchema.plugin(mongoosePaginate);
const Propertie = mongoose.model(modelName, mongoSchema);

module.exports = Propertie;
