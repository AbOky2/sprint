const express = require('express');
const { PartnerModel, UserModel, PropertieModel } = require('../models');
const {
  listCollection,
  getCollection,
  handleErrors,
  profileCollection,
} = require('../middleware/express');
const requestMiddleware = require('../middleware/request');
const joiSchema = require('../middleware/schema');
// const sms = require('../utils/sms');

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
router.put(
  '/user',
  profileCollection(
    requestMiddleware(joiSchema.user.all.user.update),
    async ({ user: sessUser, body } = {}) => {
      const data = { ...body };
      try {
        // if (data.phone) {data.phone = sms.check(data.phone);}
        const { user } = await UserModel.updateById(sessUser._id, data);
        return { user };
      } catch (error) {
        return error;
      }
    }
  )
);
router.post(
  '/sponsorship',
  requestMiddleware(joiSchema.user.sponsorship.post),
  handleErrors(async ({ user }, res) => {
    try {
      await sms.messages.create({
        body: `${user.firstName} ${user.lastName} send you a sponsorhip code: ${user.slug}`,
        from: '+33645100284',
        to: '+33645100284',
      });
    } catch (error) {
      res.json({ errors: 'Error while sending', error });
    }
  })
);

router.get(
  '/partner/:id',
  // eslint-disable-next-line no-return-await
  getCollection(async ({ id }) => await PartnerModel.get(id))
);

router.get(
  '/properties',
  listCollection(
    async ({ maxPrice, typeOfAnnonce, typeOfProperty, loc, page, limit }) => {
      const { list } = await PropertieModel.search({
        maxPrice,
        typeOfAnnonce,
        typeOfProperty:
          typeOfProperty && typeOfProperty.length > 0
            ? typeOfProperty.split(',')
            : [],
        loc,
        page,
        limit,
      });

      return { list };
    },
    joiSchema.propertie.student.search
  )
);

router.get(
  '/newProperties',
  listCollection(async ({ offset, limit }) => {
    const { list } = await PropertieModel.newProperties({ offset, limit });

    return { list };
  })
);

router.get(
  '/property/:id',
  // eslint-disable-next-line no-return-await
  getCollection(async ({ id }) => await PropertieModel.get(id))
);

router.get(
  '/partners',
  listCollection(async ({ offset, limit }) => {
    const { list } = await PartnerModel.list({ offset, limit });

    return { list };
  })
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
  })
);

module.exports = router;
