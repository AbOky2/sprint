const mongoose = require('mongoose');
const DBModel = require('./Model');

const { Schema } = mongoose;
const modelName = 'Propertie';

const mongoSchema = new Schema({
  pictures: { type: [String] },
  lot_ref: { type: String, unique: true },
  postal: { type: String },
  city: { type: String },
  country: { type: String },
  address: { type: String },
  district: { type: String },
  heading: { type: String },
  description: { type: String },
  available_date: { type: String },
  type_of_property: { type: String },
  price: { type: String },
  surface: { type: String },
  land_surface: { type: String },
  nb_pieces: { type: String },
  nb_rooms: { type: String },
  expenses: { type: String },
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
});

class PropertieClass extends DBModel {
  static name = modelName;
}
mongoSchema.loadClass(PropertieClass);

const Propertie = mongoose.model(modelName, mongoSchema);

module.exports = Propertie;
