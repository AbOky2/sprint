const winston = require('winston');
const { IS_DEV } = require('../config');

const logger = winston.createLogger({
  level: IS_DEV ? 'debug' : 'info',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
