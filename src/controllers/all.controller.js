import bluebird from 'bluebird';
import filter from 'lodash/filter';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import values from 'lodash/values';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetModel from '../model/asset.model';
import assetTestModel from '../model/asset_test.model';
import assetTypeModel from '../model/asset_type.model';
import categoryModel from '../model/category.model';
import capabilityModel from '../model/category_capability.model';
import levelModel from '../model/category_capability_level.model';
import initialiseDb from '../database/initialise-db';

const fs = bluebird.promisifyAll(require('fs'));

function cleanAll(item) {
  delete item.id;
  delete item.created_at;
  delete item.updated_at;
  delete item.asset_id;
  delete item.asset_type_id;
  delete item.category_id;
  delete item.category_capability_id;
  return item;
}

async function getAllData() {
  const response = {
    asset_types: {},
    categories: {},
  };

  const assetType = await assetTypeModel.get();
  const categories = await categoryModel.get();
  const capabilities = await capabilityModel.get();
  const levels = await levelModel.get();

  response.asset_types = values(assetType)
    .map(cleanAll);

  response.categories = values(categories);

  forEach(categories, (category) => {
    category.capabilities = values(
      filter(
        capabilities,
        capability => capability.category_id === category.id),
    );

    forEach(
      category.capabilities,
      (capability) => {
        capability.levels = values(
          filter(levels, level => level.category_capability_id === capability.id))
          .map(cleanAll);
      });
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
  };

  response.assets = await assetModel.get();
  const assetTests = await assetTestModel.get();
  const capabilities = await capabilityModel.get();
  const levels = await levelModel.get();
  const assetTypes = await assetTypeModel.get();

  forEach(response.assets, (asset) => {

    const assetType = find(assetTypes, {
      id: asset.asset_type_id,
    });

    asset.asset_type = assetType.name;

    asset.asset_tests = filter(assetTests, {
      asset_id: asset.id,
    }).map(cleanAll);

    const exportCapabilities = [];
    forEach(asset.asset_tests, (assetTest) => {
      forEach(assetTest.capabilities, (levelId, capabilityId) => {
        const capability = find(capabilities, {
          id: capabilityId,
        });

        const level = find(levels, {
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
