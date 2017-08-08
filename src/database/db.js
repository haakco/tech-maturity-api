import bluebird from 'bluebird';
import levelup from 'levelup';

const dbPath = `${__dirname}/techdb.db`;

const db = bluebird.promisifyAll(levelup(dbPath, {
  createIfMissing: false,
  valueEncoding: {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
}));

export default db;
