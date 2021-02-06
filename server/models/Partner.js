const mongoose = require('mongoose');
const { partnerTypeList } = require('../../helpers/partner');
const DBModel = require('./Model');
const { removeFiles } = require('../utils/upload');

const { Schema } = mongoose;

const modelName = 'Partner';
const mongoSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: partnerTypeList,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  why: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // position: {
  //   type: Number,
  //   required: true,
  //   // unique: true,
  //   min: 1,
  // },
});

class PartnerClass extends DBModel {
  static name = modelName;

  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.color
   */
  static async add(args) {
    try {
      if (!args.picture) throw new Error('Picture must be set');

      return super.add(args);
    } catch (error) {
      removeFiles(args.picture);
      throw error;
    }
  }
}
mongoSchema.loadClass(PartnerClass);

const Partner = mongoose.model(modelName, mongoSchema);

module.exports = Partner;
