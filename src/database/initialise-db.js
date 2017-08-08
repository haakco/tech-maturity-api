import bluebird from 'bluebird';
import levelup from 'levelup';
import allData from './migrations/allData';

const dbPath = `${__dirname}/techdb.db`;

const db = bluebird.promisifyAll(levelup(dbPath, {
  createIfMissing: true,
  valueEncoding: {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
}));

db
  .putAsync('asset_types', allData.asset_types)
  .then(() => db.putAsync('categories', allData.categories))
  .then(() => console.log('done'))
  .catch((e) => {
    console.error(e);
  });
