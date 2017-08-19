import { Router } from 'express';
import allController from '../controllers/all.controller';
import assetTypes from '../controllers/asset_types.controller';
import capabilitiesController from '../controllers/capabilities.controller';
import categoriesController from '../controllers/categories.controller';
import levelsController from '../controllers/levels.controller';
import { initialiseResponse } from '../database/initialise-db';
import assetController from '../controllers/asset.controller';
import assetTestController from '../controllers/asset_test.controller';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.send({
    title: 'Express Babel',
  });
});

routes.get('/api/all', allController.all);
routes.get('/api/all_data', allController.data);
routes.get('/api/all_assets', allController.assets);

routes.get('/api/asset_type', assetTypes.index);
routes.post('/api/asset_type', assetTypes.add);

routes.get('/api/asset', assetController.index);
routes.post('/api/asset', assetController.add);
routes.put('/api/asset', assetController.update);

routes.get('/api/asset_test', assetTestController.index);
routes.post('/api/asset_test', assetTestController.add);
routes.put('/api/asset_test', assetTestController.update);

routes.get('/api/category', categoriesController.index);

routes.get('/api/category_capability', capabilitiesController.index);
routes.post('/api/category_capability', capabilitiesController.add);
routes.put('/api/category_capability', capabilitiesController.update);
routes.delete('/api/category_capability', capabilitiesController.del);

routes.get('/api/category_capability_level', levelsController.index);

routes.get('/api/initialise', initialiseResponse);

export default routes;
