const express = require('express');
const NodeGeocoder = require('node-geocoder');
const { PartnerModel, UserModel, PropertieModel } = require('../models');
const { listCollection, getCollection, handleErrors } = require('../middleware/express');
const requestMiddleware = require('../middleware/request');
const joiSchema = require('../middleware/schema');

const options = {
  provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(options);

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

router.post(
  '/search',
  requestMiddleware(joiSchema.propertie.student.search),
  handleErrors(async (req, res) => {
    const { maxPrice, typeOfProperty, location } = req.body;
    try {
      const [{ latitude, longitude }] = [{}];
      // const [{ latitude, longitude }] = await geocoder.geocode(location);
      const coordinates = [latitude, longitude];
      const { list } = await PropertieModel.search({ maxPrice, typeOfProperty, coordinates });

      res.json({ list });
    } catch (error) {
      res.json({ errors: 'Error while searching', error });
    }
  }),
);

router.get(
  '/partner/:id',
  // eslint-disable-next-line no-return-await
  getCollection(async ({ id }) => await PartnerModel.get(id)),
);

router.get(
  '/properties',
  listCollection(async ({ offset, limit }) => {
    const { list } = await PropertieModel.list({ offset, limit });

    return { list };
  }),
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
