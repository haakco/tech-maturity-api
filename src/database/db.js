import bluebird from 'bluebird';
import levelup from 'levelup';
import isUndefined from 'lodash/isUndefined';

const dbPath = `${__dirname}/techdb.db`;

let db;
// let DataBase;

function DataBase() {
  if (isUndefined(db)) {
    db = bluebird.promisifyAll(levelup(dbPath, {
      createIfMissing: true,
      valueEncoding: 'json',
    }));
  }
  return db;
}

export default DataBase;
