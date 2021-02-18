const mongoose = require('mongoose');
const DBModel = require('./Model');
const { toggleArray } = require('../../helpers/convertAndCheck');

const { Schema } = mongoose;

const modelName = 'PartnerType';
const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

class PartnerClass extends DBModel {
  /**
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.color
   */
  static async add(name) {
    try {
      const elem = await this.findOne({ name });
      if (!elem) await this.create({ name });

      return await this.list();
    } catch (error) {
      console.log(error);
    }
  }

  static async list(where = {}) {
    try {
      const list = await this.find(where)
        .sort({ createdAt: -1 })
        .select(this.publicFields())
        .lean();

      return { list };
    } catch (error) {
      throw new Error('Error retrieving list');
    }
  }
}
PartnerClass.name = modelName;

mongoSchema.loadClass(PartnerClass);

const Partner = mongoose.model(modelName, mongoSchema);

module.exports = Partner;
