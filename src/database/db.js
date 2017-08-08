import bluebird from 'bluebird';
import levelup from 'levelup';
import initialiseDB from './initialise-db';

const dbPath = `${__dirname}/techdb.db`;

const db = bluebird.promisifyAll(levelup(dbPath, {
  createIfMissing: true,
  valueEncoding: {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
}));

db.getAsync('version')
  .then()
  .catch(() => {
    initialiseDB(db);
  });

export default db;
