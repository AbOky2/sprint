const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const DBModel = require('./Model');

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

class PromotedClass extends DBModel {}

PromotedClass.name = modelName;
mongoSchema.index({ loc: '2dsphere' });
mongoSchema.loadClass(PromotedClass);
mongoSchema.plugin(mongoosePaginate);
const Promoted = mongoose.model(modelName, mongoSchema);

module.exports = Promoted;
