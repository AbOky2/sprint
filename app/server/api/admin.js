const express = require('express');
const { UserModel, PartnerTypeModel, PromotedModel } = require('../models');
const {
  listCollection,
  updateCollection,
  deleteCollection,
  handleErrors,
} = require('../middleware/express');
const { upload, removeFiles } = require('../utils/upload');
const { isAdmin } = require('../../helpers/user');
const sameQueries = require('./utils');

const requestMiddleware = require('../middleware/request');
const joiSchema = require('../middleware/schema');

const router = express.Router();

router.use((req, res, next) => {
  if (!isAdmin(req.user)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});
router.get(
  '/users/:role?',
  listCollection(async ({ offset, limit }) => {
    const { list = [] } = await UserModel.listStudents({ offset, limit });

    return { list };
  }, joiSchema.user.admin.user.listByRole)
);
router.delete(
  `/user/:id`,
  // eslint-disable-next-line no-return-await
  deleteCollection(async ({ id }) => await UserModel.delete(id))
);
router.get(
  '/partnerTypes',
  listCollection(async ({ offset, limit }) => {
    const { list = [] } = await PartnerTypeModel.list({ offset, limit });

    return { list };
  }, joiSchema.user.admin.user.listByRole)
);
router.post(
  '/promoted',
  requestMiddleware(joiSchema.partnerType.admin.promotedType.post),
  handleErrors(async ({ body: { data } }, res) => {
    try {
      const { list = [] } = await PromotedModel.add(data);
      res.json({ list });
    } catch (error) {
      res.json({ errors: 'Error while sending', error });
    }
  })
);
router.post(
  '/partnerType',
  requestMiddleware(joiSchema.partnerType.admin.partnerType.post),
  handleErrors(async ({ body: { name } }, res) => {
    try {
      const { list = [] } = await PartnerTypeModel.add(name);
      res.json({ list });
    } catch (error) {
      res.json({ errors: 'Error while sending', error });
    }
  })
);

router.delete(
  `/partnerType/:id`,
  // eslint-disable-next-line no-return-await
  deleteCollection(async ({ id }) => await PartnerTypeModel.delete(id))
);

sameQueries.forEach(({ name: { singular, plural }, model, schema }) => {
  router.get(
    `/${plural}`,
    listCollection(async ({ offset, limit }) => {
      const { list } = await model.list({ offset, limit });

      return { list };
    })
  );

  router.put(
    `/${plural}/swapPosition`,
    requestMiddleware(schema.swapPosition),
    handleErrors(async (req, res) => {
      const { first, second } = req.body;

      if (first._id === second._id || first.position === second.position) {
        throw new Error('Values must be unique');
      }
      const data = await model.swapPosition(
        Object.keys(req.body).map((e) => req.body[e])
      );

      res.json(data);
    })
  );

  router.post(
    `/${singular}`,
    upload(plural).fields([
      { name: 'cover', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ]),
    requestMiddleware(schema.post),
    handleErrors(async (req, res) => {
      const newData = { ...req.body };

      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          const curr = req.files[key][0];
          if (curr && curr.buffer)
            newData[key] = `data:image/png;base64,${curr.buffer.toString(
              'base64'
            )}`;
        });
      }
      res.json(await model.add(newData));
    })
  );

  router.put(
    `/${singular}/:id`,
    upload(plural).fields([
      { name: 'cover', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ]),
    updateCollection(
      requestMiddleware(schema.update),
      // eslint-disable-next-line no-return-await
      async ({ req, id, data }) => {
        const newData = { ...data };
        if (req.files) {
          const elem = await model.get(id);
          if (!elem) throw new Error('La photo doit être presente');

          Object.keys(req.files).forEach((key) => {
            if (elem[key]) {
              removeFiles(elem[key]);
              newData[key] = null;
            }
            const curr = req.files[key][0];
            if (curr && curr.buffer)
              newData[key] = `data:image/png;base64,${curr.buffer.toString(
                'base64'
              )}`;
          });
        }

        // eslint-disable-next-line no-return-await
        return await model.update(id, newData);
      }
    )
  );

  router.delete(
    `/${singular}/:id`,
    // eslint-disable-next-line no-return-await
    deleteCollection(async ({ id }) => await model.delete(id))
  );
});

module.exports = router;
