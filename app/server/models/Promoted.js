const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const DBModel = require('./Model');
const PropertyModel = require('./Propertie');

const { Schema } = mongoose;
const modelName = 'Promoted';

const mongoSchema = new Schema({
  promoted: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Propertie',
      },
    ],
    validate: [(val) => val.length <= 3, '{PATH} exceeds the limit of 3'],
  },
});

class PromotedClass extends DBModel {
  /**
   * @param {Array} args
   */
  static async add(args) {
    try {
      const list = await PropertyModel.find({ _id: { $in: args } });
      if (!list) throw new Error('Unknow properties');

      await this.remove({});
      await this.create({ promoted: args });
      return { list };
    } catch (error) {
      throw error;
    }
  }

  /**
   * list
   */
  static async list() {
    try {
      const promotedList = await this.find({});
      const args = promotedList.length ? promotedList[0].promoted : [];

      const list = await PropertyModel.find({ _id: { $in: args } });

      return { list };
    } catch (error) {
      throw error;
    }
  }
}

PromotedClass.name = modelName;
mongoSchema.index({ loc: '2dsphere' });
mongoSchema.loadClass(PromotedClass);
mongoSchema.plugin(mongoosePaginate);
const Promoted = mongoose.model(modelName, mongoSchema);

module.exports = Promoted;
