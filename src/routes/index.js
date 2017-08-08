import {Router} from 'express';
import db from '../database';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.send({title: 'Express Babel'});
});

routes.get('/all', (req, res) => {
  const response = {
    asset_types: [],
    categories: [],
  };

  db.getAsync('asset_types')
    .then((result) => {
      response.asset_types = result;
      return db.getAsync('categories');
    })
    .then((result) => {
      response.categories = result;
      res.send(response);
    })
    .catch((e) => {
      console.error(e);
    });
});


routes.get('/asset_types', (req, res) => {
  db.getAsync('asset_types')
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.error(e);
    });
});

routes.get('/categories', (req, res) => {
  db.getAsync('categories')
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.error(e);
    });
});

export default routes;
