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

routes.get('/api/all', allController.index);

routes.get('/api/asset_type', assetTypes.index);
routes.post('/api/asset_type', assetTypes.add);

routes.get('/api/category', categoriesController.index);

routes.get('/api/category_capability', capabilitiesController.index);
routes.post('/api/category_capability', capabilitiesController.add);
routes.put('/api/category_capability', capabilitiesController.update);
routes.delete('/api/category_capability', capabilitiesController.del);

routes.get('/api/category_capability_level', levelsController.index);

routes.get('/api/initialise', initialiseResponse);

export default routes;
