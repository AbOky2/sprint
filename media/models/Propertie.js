const mongoose = require('mongoose');
const DBModel = require('./index');
const { typeOfAnnoncies, typeOfProperties } = require('../helpers/property');

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
  vat: { type: String },
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
  advantages: { type: [String] },
  floor: { type: Number },
  minSurface: { type: Number },
  nb_pieces: { type: String },
  maxSurface: { type: Number },
  minPieces: { type: Number },
  maxPieces: { type: Number },
  pieces: { type: [Number] },
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
}

PropertieClass.name = modelName;
mongoSchema.index({ loc: '2dsphere' });
mongoSchema.loadClass(PropertieClass);
const Propertie = mongoose.model(modelName, mongoSchema);

module.exports = Propertie;
