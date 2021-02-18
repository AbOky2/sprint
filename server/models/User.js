const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { isMajor, pick, toggleArrayOfObj } = require('../../helpers/convertAndCheck');
const {
  RoleList,
  StatusList,
  Admin,
  Inactive,
  generateSlug,
  Roomer,
  ucFirst,
  isValidateEmail,
} = require('../../helpers/user');
const { defaultLimit, defaultOffset } = require('../../helpers/query');
const DBModel = require('./Model');
const PropertyModel = require('./Propertie');
const msg = require('../utils/message');
const bcrypt = require('../utils/bcrypt');
const { ROOT_URL } = require('../../config');

// const { sendMail } = require("../services/mail");
const logger = require('../logs');

const { Schema } = mongoose;
const modelName = 'User';

const mongoSchema = new Schema({
  picture: {
    type: String,
    default: `${ROOT_URL}/static/img/users/default-picture.png`,
    // required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Propertie' }],
  sponsorshipCode: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Date,
    validate: {
      validator: (v) => isMajor(v),
      message: msg.notMajor,
    },
  },
  school: {
    type: String,
  },
  role: {
    type: String,
    enum: RoleList,
    default: Roomer,
    required: true,
  },
  status: {
    type: String,
    enum: StatusList,
    default: Inactive,
    // required: true,
  },
  provider: {
    type: String,
  },
  referrer_url: {
    type: String,
  },
});

class UserClass extends DBModel {
  static publicFields() {
    return [
      '_id',
      'picture',
      'firstName',
      'lastName',
      'bookmarks',
      'sponsorshipCode',
      'school',
      'phone',
      'email',
      'isAdmin',
      'slug',
      'role',
      'status',
      'age',
    ];
  }

  static async getId(where) {
    const user = await this.findOne(where).populate('bookmarks').select('_id').lean();

    if (!user) return { userId: null };

    return { userId: user._id };
  }

  static async updateById(_id, updates) {
    const userDoc = await this.findOne({ _id }).populate('bookmarks');
    const salt = await bcrypt.genSalt(10);

    if (!userDoc) {
      throw new Error(msg.notFound('User'));
    }

    if (!isValidateEmail(updates.email)) throw new Error(msg.invalidInfo('Email'));
    Object.entries(updates)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, value]) => value !== undefined)
      .forEach(([key, value]) => {
        userDoc[key] = value;
      });
    userDoc.firstName = ucFirst(userDoc.firstName);
    userDoc.lastName = ucFirst(userDoc.lastName);

    if (userDoc.password) userDoc.password = await bcrypt.hash(userDoc.password, salt);
    await userDoc.save();
    const user = await this.findOne({ _id }).populate('bookmarks').lean();

    return { user: pick(user, this.publicFields()) };
  }

  static async getUserZones(_id) {
    const list = await this.findOne(_id).select('zones').lean();

    return { list };
  }

  static async getIdBySlug({ slug }) {
    return this.getId({ slug });
  }

  static async listStudents({ limit = defaultLimit, offset: page = defaultOffset } = {}) {
    const query = { role: { $ne: Admin } };
    const list = await this.paginate(query, { limit, page, forceCountFn: true });

    return { list };
  }

  static async add(options) {
    const { email, firstName, lastName } = options;
    const slug = await generateSlug(this, firstName + lastName);
    const salt = await bcrypt.genSalt(10);

    let user = options;

    if (!isValidateEmail(user.email)) throw new Error(msg.invalidInfo('Email'));
    user.firstName = ucFirst(user.firstName);
    user.lastName = ucFirst(user.lastName);

    user.password = await bcrypt.hash(user.password, salt);
    user = await this.create({ ...options, slug });

    if (email) {
      // Send Email
    }

    return { user };
  }

  static async addBookmark(id, propertyId) {
    const userDoc = await this.findById(id).populate('bookmarks');
    const property = await PropertyModel.findById(propertyId);

    userDoc.bookmarks = toggleArrayOfObj(userDoc.bookmarks, property, (e) => e._id);
    userDoc.save();
    const user = userDoc.toObject();

    return { user: pick(user, this.publicFields()) };
  }

  /**
   * Get a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   */
  static async getBySlug({ slug }) {
    const userDoc = await this.findOne({ slug }).select(this.publicFields());

    if (!userDoc) {
      throw new Error(msg.notFound('User'));
    }
    const user = userDoc.toObject();

    return { user };
  }

  /**
   * Get a User by its slug
   * @param {Object} params
   * @param {String} params.slug - The slug of the User to get
   */
  static async getById(_id) {
    let userDoc = null;

    try {
      userDoc = await this.findOne({ _id }).populate('bookmarks').select(this.publicFields());
      if (!_id || !userDoc) {
        throw new Error(msg.notFound('User'));
      }
      userDoc = userDoc.toObject();
    } catch (err) {
      logger.error(err);
    }

    return userDoc;
  }

  static async signInOrSignUpViaSocialMedia({
    role,
    email,
    password,
    provider,
    avatarUrl,
    firstName,
    lastName,
  }) {
    let user = await this.findOne({ email });

    if (!user) {
      user = (
        await this.add({
          role,
          email,
          password,
          firstName,
          provider,
          lastName,
          picture: avatarUrl,
        })
      ).user;
    }
    user = user.toObject();

    return pick(user, this.publicFields());
  }

  static async signIn(options) {
    const { email, password } = options;

    let user = await this.findOne({ email }).populate('bookmarks');

    if (!user) throw new Error(msg.notFound('Email'));
    if (!user.password) throw new Error('Account has no password.');

    const isMatch = await bcrypt.compare(password, user.password);

    user = user.toObject();
    if (isMatch) return pick(user, this.publicFields());
    throw new Error(msg.invalidInfo('password'));
  }

  static async signUp(options) {
    let user = null;

    if (options.sponsorshipCode && !(await this.findOne({ slug: options.sponsorshipCode })))
      throw new Error(msg.invalidInfo('Code de parrainage'));

    if (await this.findOne({ email: options.email }).populate('bookmarks')) {
      throw new Error(msg.alreadyExist('Email'));
    }

    user = (await this.add(options)).user;
    user = user.toObject();

    return pick(user, this.publicFields());
  }
}

UserClass.name = modelName;
mongoSchema.loadClass(UserClass);
mongoSchema.plugin(mongoosePaginate);
const User = mongoose.model(modelName, mongoSchema);

module.exports = User;
