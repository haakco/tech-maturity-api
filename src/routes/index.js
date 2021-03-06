import { Router } from 'express';
import multer from 'multer';
import allController from '../controllers/all.controller';
import assetController from '../controllers/asset.controller';
import assetGroupController from '../controllers/asset_group.controller';
import assetTestController from '../controllers/asset_test.controller';
import capabilitiesController from '../controllers/capabilities.controller';
import categoriesController from '../controllers/categories.controller';
import levelsController from '../controllers/levels.controller';
import initialiseDb from '../database/initialise-db';

const routes = Router();
const upload = multer({ dest: 'uploads/' });

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
routes.post('/api/config_upload', upload.single('tmConfig'), allController.upload);

routes.get('/api/asset', assetController.index);
routes.post('/api/asset', assetController.add);
routes.put('/api/asset', assetController.update);

routes.get('/api/asset_test', assetTestController.index);
routes.post('/api/asset_test', assetTestController.add);
routes.put('/api/asset_test', assetTestController.update);
routes.delete('/api/asset_test/:test_id', assetTestController.del);

routes.get('/api/category', categoriesController.index);

routes.get('/api/category_capability', capabilitiesController.index);
routes.post('/api/category_capability', capabilitiesController.add);
routes.put('/api/category_capability', capabilitiesController.update);
routes.delete('/api/category_capability', capabilitiesController.del);

routes.get('/api/asset_group', assetGroupController.index);
routes.post('/api/asset_group', assetGroupController.add);
routes.post('/api/asset_group/add_assets', assetGroupController.addAssetToAssetGroup);
routes.post('/api/asset_group/add_asset_groups', assetGroupController.addAssetGroupToAssetGroup);
routes.delete('/api/asset_group/:asset_group_id', assetGroupController.del);

routes.get('/api/category_capability_level', levelsController.index);

routes.get('/api/initialise', initialiseDb.initialiseDB);
routes.post('/api/load_db', initialiseDb.loadDb);

export default routes;
