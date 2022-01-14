const fs = require('fs');
const AdmZip = require('adm-zip');
const { format, subDays } = require('date-fns');
const ftpClient = require('ftp');
const logger = require('../logs');
const {
  FTP_HOST,
  FTP_USER,
  FTP_PASSWORD,
  PUBLIC_PROPERTIES_DIR,
} = require('../config');

const fileNamePrefix = 'mbi_neuf_ancien_';
module.exports = (cbl, args) => {
  const c = new ftpClient();
  c.connect({ host: FTP_HOST, user: FTP_USER, password: FTP_PASSWORD });

  c.on('ready', () => {
    const date = format(new Date(), 'yyyyMMdd');
    const todayMbiFileName = `${fileNamePrefix}${date}.zip`;
    c.get(todayMbiFileName, (err, stream) => {
      if (err) {
        logger.error(err);
        return c.end();
      }
      if (!stream) {
        logger.error(`${todayMbiFileName} not found`);
        return c.end();
      }
      stream.pipe(fs.createWriteStream(todayMbiFileName));
      stream.on('end', () => {
        const zip = new AdmZip(todayMbiFileName);
        logger.info('Moving started');
        zip.extractAllTo(PUBLIC_PROPERTIES_DIR, true);
        fs.unlinkSync(todayMbiFileName);
        logger.info('Moving finsh');

        logger.info('Starting remove');
        const excudeDates = Array.from(
          { length: 3 },
          (_, i) =>
            `${fileNamePrefix}${format(subDays(new Date(), i), 'yyyyMMdd')}.zip`
        );
        c.list((err, list) => {
          if (err) logger.error(err);
          const listData = list.filter(
            (l) =>
              l.name.includes(fileNamePrefix) && !excudeDates.includes(l.name)
          );
          if (!listData.length) {
            c.end();
            if (cbl) {
              logger.info('Starting mbi');
              return cbl(args);
            }
            return logger.info('Done without starting mbi');
          }
          listData.forEach((l, i) => {
            logger.info(l.name, 'starting');
            c.delete(l.name, (err, data) => {
              if (err) logger.error(err);
              if (i === listData.length - 1) {
                c.end();
                if (cbl) {
                  logger.info('Starting mbi');
                  return cbl(args);
                }
                return logger.info('Done without starting mbi');
              }
            });
          });
        });
      });
    });
  });
};
