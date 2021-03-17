const { removeFiles } = require('../utils/upload');
const { isArray, isObject } = require('../../helpers/convertAndCheck');

const middleware = (schema, reqProperty = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[reqProperty]);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    if (req.files) {
      if (isArray(req.files)) removeFiles(req.files.map((e) => e.path.split('static')[1]));
      else if (isObject(req.files)) {
        Object.keys(req.files).forEach((key) => {
          const curr = req.files[key][0];
          if (curr && curr.filename) removeFiles(curr.path.split('static')[1]);
        });
      }
    }
    res.status(422).json({ error: message });
  }
};

module.exports = middleware;
