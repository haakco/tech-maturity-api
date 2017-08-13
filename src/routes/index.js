import { Router } from 'express';
import allController from '../controllers/all.controller';
import assetTypes from '../controllers/asset_types.controller';
import capabilitiesController from '../controllers/capabilities.controller';
import categoriesController from '../controllers/categories.controller';
import levelsController from '../controllers/levels.controller';
import { initialiseResponse } from '../database/initialise-db';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.send({
    title: 'Express Babel',
  });
});

routes.get('/all', allController.index);

routes.get('/asset_types', assetTypes.index);
routes.post('/asset_type', assetTypes.add);

routes.get('/categories', categoriesController.index);

routes.get('/capabilities', capabilitiesController.index);
routes.post('/capability', capabilitiesController.add);
routes.put('/capability', capabilitiesController.update);
routes.delete('/capability', capabilitiesController.del);

routes.get('/levels', levelsController.index);

routes.get('/initialise', initialiseResponse);

export default routes;
