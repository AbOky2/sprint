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

// router.post('/stripe/fetch-checkout-session', async (req, res) => {
//   try {
//     const { bookId, redirectUrl } = req.body;

//     const book = await Book.findById(bookId).select(['slug']).setOptions({ lean: true });

//     if (!book) {
//       throw new Error('Book not found');
//     }

//     const isPurchased =
//       (await Purchase.find({ userId: req.user._id, bookId: book._id }).countDocuments()) > 0;
//     if (isPurchased) {
//       throw new Error('You already bought this book.');
//     }

//     const session = await createSession({
//       userId: req.user._id.toString(),
//       userEmail: req.user.email,
//       bookId,
//       bookSlug: book.slug,
//       redirectUrl,
//     });

//     res.json({ sessionId: session.id });
//   } catch (err) {
//     logger.error(err);
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.get('/my-books', async (req, res) => {
//   try {
//     const { purchasedBookIds = [] } = req.user;

//     const { purchasedBooks } = await Book.getPurchasedBooks({ purchasedBookIds });

//     res.json({ purchasedBooks });
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

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
