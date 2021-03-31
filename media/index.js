const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const CronJob = require('cron').CronJob;
const { MONGO_URL, PORT, ROOT_URL } = require('./config');
const readMbi = require('./utils/mbi');
const ftp = require('./utils/ftp');
const logger = require('./logs');
const app = express();
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(MONGO_URL, options);
app.use(helmet());
app.use(express.static('public'));

// const job = new CronJob('0 0 */6 * * *', function () {
try {
  // const d = new Date();
  // logger.log('Starting mbi at sync', d);
  ftp();
  // readMbi();
} catch (err) {
  logger.error(err);
}
// });
// job.start();

app.listen(PORT, () => {
  console.log(`Example app listening at ${ROOT_URL}`);
});
