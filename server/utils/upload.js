const multer = require('multer');
const fs = require('fs');
const { ROOT_URL } = require('../../config');
const logger = require('../logs');

const restrictedPath = ['default-picture.png'];
const fileFilter = (req, file, cb) => {
  if (!file.fieldname || !req.user || !req.user.slug) return cb(null, false);

  return cb(null, true);
};
const unlinkFile = (filePath) => {
  let newPath = filePath;
  const rootPath = `${ROOT_URL}/`;

  if (restrictedPath.find((e) => newPath.includes(e))) return;
  if (!newPath) return;
  if (newPath.includes(rootPath)) newPath = newPath.replace(rootPath, '');
  fs.unlinkSync(newPath);
};

module.exports = {
  upload: (folderName = '') => multer({ dest: `public/img/${folderName}`, fileFilter }),
  removeFiles: (files) => {
    if (!files) return;
    try {
      if (Array.isArray(files)) return files.forEach((e) => unlinkFile(e));

      unlinkFile(files);
    } catch (err) {
      logger.error(err);
    }
  },
  createImagePath: (e) => `${ROOT_URL}/${e}`,
};
