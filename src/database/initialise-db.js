import allData from './migrations/allData';

function initialiseDB(db) {
  db
    .putAsync('asset_types', allData.asset_types)
    .then(() => db.putAsync('version', 1))
    .then(() => db.putAsync('categories', allData.categories))
    .then(() => console.log('done'))
    .catch((e) => {
      console.error(e);
    });
}

export default initialiseDB;
