const logger = require('../logs');
const msg = require('../utils/message');

class DBModel {
  static publicFields() {
    return ['-__v'];
  }

  static async add(args) {
    try {
      console.log(args);
      const newData = await this.create(args);

      const elem = newData.toObject();

      return { elem };
    } catch (error) {
      logger.error(error);
    }
  }

  static async get(_id) {
    try {
      const element = await this.findById(_id, this.publicFields());

      if (!element) {
        throw new Error('Element not found');
      }

      return element;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * List a limited amount of Users
   * @param {Object} [where] - Filtering criterias
   * @param {Object} [options]
   * @param {Number} [options.offset] - Amount of Users to skip
   * @param {Number} [options.limit] - Amount of Users to return
   */
  static async list(where = {}, { offset = 0, limit = 6 } = {}) {
    try {
      const list = await this.find(where)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .select(this.publicFields())
        .lean();

      return { list };
    } catch (error) {
      throw new Error('Error retrieving list');
    }
  }

  static async updateById(_id, updates) {
    try {
      const elementDoc = await this.findById(_id);

      if (!elementDoc) {
        throw new Error(msg.notFound(this.name));
      }
      Object.entries(updates)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .forEach(([key, value]) => {
          elementDoc[key] = value;
        });
      await elementDoc.save();
      const element = elementDoc.toObject();

      return { element };
    } catch (error) {
      logger.error(error);
    }
  }

  static async update(_id, data = {}) {
    try {
      await this.updateOne({ _id }, data);

      return await this.list();
    } catch (error) {
      logger.error(error);
      throw new Error('Error white updating');
    }
  }

  static async delete(_id) {
    try {
      await this.deleteOne({ _id });

      return await this.list();
    } catch (error) {
      logger.error(error);
      throw new Error('Error white delete');
    }
  }

  static async swapPosition(data) {
    const first = await this.findById(data[0]._id);

    const second = await this.findById(data[1]._id);

    first.position = data[0].position;
    second.position = data[1].position;

    first.markModified('position');
    second.markModified('position');
    await first.save();
    await second.save();

    return { first, second };
  }
}
DBModel.name = 'Element';

module.exports = DBModel;
