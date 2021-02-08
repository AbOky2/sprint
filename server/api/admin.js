const express = require('express');
const { UserModel } = require('../models');
const {
  listCollection,
  updateCollection,
  deleteCollection,
  handleErrors,
} = require('../middleware/express');
const { upload, createImagePath, removeFiles } = require('../utils/upload');
const { Admin } = require('../../helpers/user');
const sameQueries = require('./utils');

const requestMiddleware = require('../middleware/request');
const joiSchema = require('../middleware/schema');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});
router.get(
  '/users/:role?',
  requestMiddleware(joiSchema.user.admin.user.listByRole, 'params'),
  handleErrors(async (req, res) => {
    const role = req.params.role ? { role: req.params.role } : { role: { $ne: Admin } };
    const { list } = await UserModel.list(role);

    res.json({ list });
  }),
);
sameQueries.forEach(({ name: { singular, plural }, model, schema }) => {
  router.get(
    `/${plural}`,
    listCollection(async ({ offset, limit }) => {
      const { list } = await model.list({ offset, limit });

      list.sort((a, b) => a.position - b.position);

      return { list };
    }),
  );

  router.put(
    `/${plural}/swapPosition`,
    requestMiddleware(schema.swapPosition),
    handleErrors(async (req, res) => {
      const { first, second } = req.body;

      if (first._id === second._id || first.position === second.position) {
        throw new Error('Values must be unique');
      }
      const data = await model.swapPosition(Object.keys(req.body).map((e) => req.body[e]));

      res.json(data);
    }),
  );

  router.post(
    `/${singular}`,
    upload(plural).single('upload'),
    requestMiddleware(schema.post),
    handleErrors(async (req, res) => {
      const newData = req.body;
      const picture = createImagePath(req.file?.path);

      delete newData.upload;
      newData.picture = picture;
      res.json(await model.add(newData));
    }),
  );

  router.put(
    `/${singular}/:id`,
    upload(plural).single('upload'),
    updateCollection(
      requestMiddleware(schema.update),
      // eslint-disable-next-line no-return-await
      async ({ id, data }) => {
        console.log(data);
        await model.update(id, data);
      },
    ),
  );

  router.delete(
    `/${singular}/:id`,
    deleteCollection(async ({ id }) => {
      const elem = await model.get(id);

      removeFiles(elem.picture);
      await model.delete(id);
    }),
  );
});
// router.get('/books', async (req, res) => {
//   try {
//     const books = await Book.list();
//     res.json(books);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.post('/books/add', async (req, res) => {
//   try {
//     const book = await Book.add({ userId: req.user.id, ...req.body });
//     res.json(book);
//   } catch (err) {
//     logger.error(err);
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.post('/books/edit', async (req, res) => {
//   try {
//     const editedBook = await Book.edit(req.body);
//     res.json(editedBook);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.get('/books/detail/:slug', async (req, res) => {
//   try {
//     const book = await Book.getBySlug({ slug: req.params.slug });
//     res.json(book);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// });

// // github-related

// router.get('/github/repos', async (req, res) => {
//   const user = await User.findById(req.user._id, 'isGithubConnected githubAccessToken');

//   if (!user.isGithubConnected || !user.githubAccessToken) {
//     res.json({ error: 'Github not connected' });
//     return;
//   }

//   try {
//     const response = await getRepos({ user, request: req });
//     res.json({ repos: response.data });
//   } catch (err) {
//     logger.error(err);
//     res.json({ error: err.message || err.toString() });
//   }
// });

// router.post('/books/sync-content', async (req, res) => {
//   const { bookId } = req.body;

//   const user = await User.findById(req.user._id, 'isGithubConnected githubAccessToken');

//   if (!user.isGithubConnected || !user.githubAccessToken) {
//     res.json({ error: 'Github not connected' });
//     return;
//   }

//   try {
//     await Book.syncContent({ id: bookId, user, request: req });
//     res.json({ done: 1 });
//   } catch (err) {
//     logger.error(err);
//     res.json({ error: err.message || err.toString() });
//   }
// });

module.exports = router;
