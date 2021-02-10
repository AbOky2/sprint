const express = require('express');
// const NodeGeocoder = require('node-geocoder');
const { PartnerModel, UserModel, PropertieModel } = require('../models');
const { listCollection, getCollection, handleErrors } = require('../middleware/express');
const requestMiddleware = require('../middleware/request');
const joiSchema = require('../middleware/schema');

// const options = {
//   provider: 'openstreetmap',
// };
// const geocoder = NodeGeocoder(options);

// const Book = require('../models/Book');
// const Purchase = require('../models/Purchase');
// const { createSession } = require('../stripe');
// const logger = require('../logger');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});
router.get('/currentUser', ({ user }, res) => {
  if (!user) {
    return res.status(401).json({ success: false });
  }
  res.json({ user });
});

router.get(
  '/partner/:id',
  // eslint-disable-next-line no-return-await
  getCollection(async ({ id }) => await PartnerModel.get(id)),
);

router.get(
  '/properties',
  listCollection(async ({ maxPrice, typeOfProperty, location, offset, limit }) => {
    const [{ latitude, longitude }] = [{}];
    // const [{ latitude, longitude }] = await geocoder.geocode(location);
    const coordinates = [latitude, longitude];
    const { list } = await PropertieModel.search({
      maxPrice,
      typeOfProperty,
      coordinates,
      offset,
      limit,
    });

    return { list };
  }, joiSchema.propertie.student.search),
);

router.get(
  '/property/:id',
  // eslint-disable-next-line no-return-await
  getCollection(async ({ id }) => await PropertieModel.get(id)),
);

router.get(
  '/partners',
  listCollection(async ({ offset, limit }) => {
    const { list } = await PartnerModel.list({ offset, limit });

    return { list };
  }),
);

router.post(
  '/bookmark',
  requestMiddleware(joiSchema.user.bookmark.post),
  handleErrors(async (req, res) => {
    try {
      const { user } = await UserModel.addBookmark(req.user._id, req.body.id);

      res.json({ user });
    } catch (error) {
      res.json({ errors: 'Error while adding', error });
    }
  }),
);

module.exports = router;
