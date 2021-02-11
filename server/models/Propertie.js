const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const DBModel = require('./Model');
const { typeOfAnnoncies, typeOfProperties } = require('../../helpers/property');

const { Schema } = mongoose;
const modelName = 'Propertie';

const mongoSchema = new Schema({
  pictures: { type: [String] },
  lot_ref: { type: String, unique: true },
  postal: { type: String },
  city: { type: String },
  isNewProperty: { type: Boolean },
  country: { type: String },
  address: { type: String },
  district: { type: String },
  heading: { type: String },
  description: { type: String },
  available_date: { type: String },
  typeOfAnnonce: { type: String, enum: typeOfAnnoncies },
  typeOfProperty: { type: String, enum: typeOfProperties },
  price: { type: Number },
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
  static async search({
    maxPrice,
    typeOfAnnonce,
    typeOfProperty = [],
    coordinates,
    limit = 6,
    offset = 0,
  }) {
    const query = {
      $and: [
        typeOfProperty.length > 0 ? { typeOfProperty: { $in: typeOfProperty } } : {},
        maxPrice > 0 ? { price: { $lte: parseInt(maxPrice, 10) } } : {},
        { typeOfAnnonce },
      ],
    };
    const list = await this.paginate(query, { limit, offset });
    return { list };
  }
}

PropertieClass.name = modelName;
mongoSchema.loadClass(PropertieClass);
mongoSchema.plugin(mongoosePaginate);
const Propertie = mongoose.model(modelName, mongoSchema);

module.exports = Propertie;
