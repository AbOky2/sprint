const Joi = require('joi');
const { removeFiles } = require('../utils/upload');

const middleware = (schema, reqProperty = 'body') => (req, res, next) => {
  const { error } = Joi.validate(req[reqProperty], schema);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    if (req.files) removeFiles(req.files.map((e) => e.path));
    res.status(422).json({ error: message });
  }
};

module.exports = middleware;
