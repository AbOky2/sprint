const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { isArray } = require('../../helpers/convertAndCheck');
const logger = require('../logs');

const storage = multer.memoryStorage();
const restrictedPath = ['default-picture.png'];
const fileFilter = (req, file, cb) => {
  if (!file.fieldname || !req.user || !req.user.slug) return cb(null, false);

  return cb(null, true);
};
const unlinkFile = (filePath) => {
  let newPath = filePath;
  const rootPath = path.resolve(__dirname, '..', '..', 'static');

  if (restrictedPath.find((e) => newPath.includes(e))) return;
  if (!newPath) return;
  if (newPath.includes(rootPath)) newPath = newPath.replace(rootPath, '');
  fs.unlinkSync(rootPath + newPath);
};

module.exports = {
  upload: (folderName = '') => multer({ storage }),
  removeFiles: (files) => {
    if (!files) return;
    try {
      if (isArray(files)) return files.forEach((e) => unlinkFile(e));

      unlinkFile(files);
    } catch (err) {
      logger.error(err);
    }
  },
  createImagePath: (e) => `/${e}`,
};
