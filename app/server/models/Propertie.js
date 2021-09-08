const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const DBModel = require('./Model');
const {
  typeOfAnnoncies,
  typeOfProperties,
  sortByKeys,
} = require('../../helpers/property');

const { defaultLimit, defaultOffset } = require('../../helpers/query');
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

  static async publicSearch({
    maxPrice,
    typeOfAnnonce,
    pieces = [],
    loc,
    limit = defaultLimit,
    page = defaultOffset,
    sort,
  }) {
    const {
      geo,
      near,
      zoom = 12,
      adressType,
      $geometry,
      number,
    } = await maps.find(loc);
    const $maxDistance = 5000;
    // const $maxDistance = 1 * 1609.34;
    const priceSort = sortByKeys.includes(sort) ? sort : sortByKeys[0];
    const docs = await this.find(
      maps.geoQuery({
        pieces,
        maxPrice,
        near,
        $maxDistance,
        typeOfAnnonce,
        $geometry,
      }),
      null,
      {
        sort: { price: priceSort },
      }
    );
    const list = {
      docs,
      zoom,
      near: [near[1], near[0]],
      adressType,
    };
    if (adressType === 'departement') list.department = { number };
    else if (geo.city && geo.administrativeLevels) {
      const department = await maps.find(geo.administrativeLevels.level2long);
      const q = maps.geoQuery({
        pieces,
        maxPrice,
        near: department.near,
        $maxDistance,
        typeOfAnnonce,
        $geometry: department.$geometry,
      });

      list.department = {
        name: geo.administrativeLevels.level2long,
        number: department.number,
        lotFound: await this.find(q, null, {
          sort: { price: priceSort },
        }),
      };
    }

    return { list };
  }

  static async search({
    maxPrice,
    typeOfAnnonce,
    pieces = [],
    loc,
    limit = defaultLimit,
    page = defaultOffset,
    sort,
  }) {
    let near = [];
    let zoom = 12;

    if (loc) {
      let geo = await maps.geocoder.geocode({
        address: loc,
        country: 'france',
      });
      if (geo && geo[0]) {
        geo = geo[0];
        // near = [geo.latitude, geo.longitude];
        near = [geo.longitude, geo.latitude];
        if (!geo.city)
          zoom = Object.keys(geo.administrativeLevels).length ? 8 : 5;
      }
    }

    // const $maxDistance = 1 * 1609.34;
    const $maxDistance = 8000;
    const query = {
      $and: [
        pieces.length > 0 ? { pieces: { $in: pieces } } : {},
        maxPrice >= 0 ? { price: { $lte: parseInt(maxPrice, 10) } } : {},
        near.length > 0
          ? {
              loc: {
                $nearSphere: {
                  $maxDistance,
                  $geometry: {
                    type: 'Point',
                    coordinates: near,
                  },
                },
              },
            }
          : {},
        { loc: { $ne: null } },
        { price: { $ne: null } },
        { available: true },
        { typeOfAnnonce },
      ],
    };
    const priceSort = sortByKeys.includes(sort) ? sort : sortByKeys[0];
    const docs = await this.find(query, null, {
      sort: { price: priceSort },
    });
    const list = {
      docs,
      near: [near[1], near[0]],
      zoom,
      total: await this.count(),
    };

    return { list };
  }

  static async searchByPoint({
    maxPrice,
    typeOfAnnonce,
    pieces = [],
    loc,
    limit = defaultLimit,
    page = defaultOffset,
    sort,
    zoom,
  }) {
    const near = [loc.lat, loc.lng];
    // zoom = 12;
    const $maxDistance = (19 - zoom) * 10000;
    const query = {
      $and: [
        pieces.length > 0 ? { pieces: { $in: pieces } } : {},
        maxPrice >= 0 ? { price: { $lte: parseInt(maxPrice, 10) } } : {},
        near.length > 0
          ? {
              loc: {
                $nearSphere: {
                  $maxDistance,
                  $geometry: {
                    type: 'Point',
                    coordinates: [near[1], near[0]],
                  },
                },
              },
            }
          : {},
        { loc: { $ne: null } },
        { price: { $ne: null } },
        { available: true },
        { typeOfAnnonce },
      ],
    };

    const priceSort = sortByKeys.includes(sort) ? sort : sortByKeys[0];
    const docs = await this.find(query);
    const list = {
      docs,
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
