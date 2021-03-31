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
  transport_lines: { type: String },
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

  static async search({
    maxPrice,
    typeOfAnnonce,
    pieces = [],
    loc,
    limit = defaultLimit,
    page = defaultOffset,
    sort = sortByKeys[0],
  }) {
    let near = [];
    if (loc) {
      const geo = await maps.geocode({
        address: loc,
        country: 'france',
      });
      console.log(geo);
      if (geo && geo[0]) near = [geo[0].longitude, geo[0].latitude];
    }

    const query = {
      $and: [
        pieces.length > 0 ? { pieces: { $in: pieces } } : {},
        maxPrice >= 0 ? { price: { $lte: parseInt(maxPrice, 10) } } : {},
        near.length > 0
          ? {
              loc: {
                $near: {
                  $geometry: {
                    type: 'Point',
                    coordinates: near,
                  },
                  $maxDistance: 100000,
                },
              },
            }
          : {},
        { price: { $ne: null } },
        { available: true },
        { typeOfAnnonce },
      ],
    };

    const priceSort = sortByKeys.includes(sort) ? sort : sortByKeys[0];
    const list = await this.paginate(query, {
      limit,
      page,
      forceCountFn: true,
      sort: { price: priceSort },
    });
    return { list };
  }
}

PropertieClass.name = modelName;
mongoSchema.index({ loc: '2dsphere' });
mongoSchema.loadClass(PropertieClass);
mongoSchema.plugin(mongoosePaginate);
const Propertie = mongoose.model(modelName, mongoSchema);

module.exports = Propertie;
