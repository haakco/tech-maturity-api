import bluebird from 'bluebird';
import { filter as lodashFilter, find as lodashFind, forEach as lodashForeach, values as lodashValues } from 'lodash';
import initialiseDb from '../database/initialise-db';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetModel from '../model/asset.model';
import assetGroupModel from '../model/asset_group.model';
import assetTestModel from '../model/asset_test.model';
import categoryModel from '../model/category.model';
import capabilityModel from '../model/category_capability.model';
import levelModel from '../model/category_capability_level.model';

const fs = bluebird.promisifyAll(require('fs'));

function cleanAll(item) {
  delete item.id;
  delete item.updated_at;
  delete item.asset_id;
  delete item.category_id;
  delete item.category_capability_id;
  return item;
}

async function getAllData() {
  const response = {
    categories: {},
  };

  const categories = await categoryModel.get();
  const capabilities = await capabilityModel.get();
  const levels = await levelModel.get();

  response.categories = lodashValues(categories);

  lodashForeach(categories, (category) => {
    category.capabilities = lodashValues(
      lodashFilter(
        capabilities,
        capability => capability.category_id === category.id,
      ));

    lodashForeach(
      category.capabilities,
      (capability) => {
        capability.levels = lodashValues(
          lodashFilter(levels, level => level.category_capability_id === capability.id))
          .map(cleanAll);
      },
    );

    category.capabilities
      .map(cleanAll);
  });

  response.categories
    .map(cleanAll);

  return response;
}

async function allAssetData() {
  const response = {
    assets: {},
    asset_groups: {},
  };

  response.assets = await assetModel.get();
  response.asset_groups = await assetGroupModel.get();
  response.asset_groups.map(cleanAll);
  const assetTests = await assetTestModel.get();
  const capabilities = await capabilityModel.get();
  const levels = await levelModel.get();

  lodashForeach(response.assets, (asset) => {
    asset.asset_tests = lodashFilter(assetTests, {
      asset_id: asset.id,
    }).map(cleanAll);

    const exportCapabilities = [];
    lodashForeach(asset.asset_tests, (assetTest) => {
      lodashForeach(assetTest.capabilities, (levelId, capabilityId) => {
        const capability = lodashFind(capabilities, {
          id: capabilityId,
        });

        const level = lodashFind(levels, {
          id: levelId,
        });

        exportCapabilities.push({
          capability: capability.name,
          minimum_category_capability_level_id: capability.minimum_category_capability_level_id,
          level: level.level,
          level_value: level.value,
          score: level.level - capability.minimum_category_capability_level_id,
        });
      });
      assetTest.capabilities = exportCapabilities;
    });
  });

  response.assets
    .map(cleanAll);


  return response;
}

const data = asyncMiddleware(async (req, res) => {
  const allData = await getAllData();
  res.send(allData);
});

const assets = asyncMiddleware(async (req, res) => {
  const assetData = await allAssetData();
  res.send(assetData);
});

const all = asyncMiddleware(async (req, res) => {
  const allData = await getAllData();
  const assetData = await allAssetData();
  allData.assets = assetData.assets;
  if (req.query.download) {
    res.set('Content-Disposition', 'attachment;filename=tmBackup.json');
  }
  res.send(allData);
});

const upload = asyncMiddleware(async (req, res) => {
  if (!req.body) {
    req.body = {};
  }
  req.body.data = await fs.readFileAsync(req.file.path, 'utf8');
  await fs.unlinkAsync(req.file.path);
  return initialiseDb.loadDb(req, res);
});

const allController = {
  all,
  data,
  assets,
  upload,
};

export default allController;
