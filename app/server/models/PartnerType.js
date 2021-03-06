const mongoose = require('mongoose');
const DBModel = require('./Model');

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
  static async add(name) {
    try {
      const elem = await this.findOne({ name });
      if (!elem) await this.create({ name });

      return await this.list();
    } catch (error) {
      throw new Error('Error while add');
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
