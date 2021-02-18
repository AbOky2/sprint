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
  cover: {
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
  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.color
   */
  static async add(args) {
    try {
      if (!args.picture) throw new Error('Picture must be set');

      await this.create(args);

      return await this.list();
    } catch (error) {
      removeFiles(args.cover);
      removeFiles(args.picture);
      throw error;
    }
  }

  static async delete(_id) {
    try {
      const elem = await this.get({ _id });
      await this.deleteOne({ _id });

      removeFiles(elem.cover);
      removeFiles(elem.picture);
      return await this.list();
    } catch (error) {
      throw new Error('Error white delete');
    }
  }
}
PartnerClass.name = modelName;

mongoSchema.loadClass(PartnerClass);

const Partner = mongoose.model(modelName, mongoSchema);

module.exports = Partner;
