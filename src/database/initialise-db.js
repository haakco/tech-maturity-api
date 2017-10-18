import cloneDeep from 'lodash/cloneDeep';
/* eslint-disable no-restricted-syntax,no-await-in-loop */
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetModel from '../model/asset.model';
import assetGroupModel from '../model/asset_group.model';
import assetTestModel from '../model/asset_test.model';
import categoryModel from '../model/category.model';
import capabilityModel from '../model/category_capability.model';
import levelModel from '../model/category_capability_level.model';
import dbVersion from '../model/db_version.model';
import allData from './migrations/allData';

async function addCapability(capability) {
  const levels = capability.levels;
  delete capability.levels;
  const newCapability = await capabilityModel.add(capability);

  if (!isUndefined(levels) && isArray(levels)) {
    for (const level of levels) {
      level.category_id = newCapability.category_id;
      level.category_capability_id = newCapability.id;
      await levelModel.add(level);
    }
  }
}

async function addCategory(category) {
  const capabilities = category.capabilities;
  delete category.capabilities;
  const newCategory = await categoryModel.add(category);
  if (!isUndefined(capabilities) && isArray(capabilities)) {
    for (const capability of capabilities) {
      capability.category_id = newCategory.id;
      await addCapability(capability);
    }
  }
}

async function addAssetTests(assetTest) {
  const testCapabilities = assetTest.capabilities;
  assetTest.capabilities = {};

  if (!isUndefined(testCapabilities) && isArray(testCapabilities)) {
    for (const capability of testCapabilities) {
      const testCapability = await capabilityModel.first({
        name: capability.capability,
      });

      if (testCapability) {
        const testLevel = await levelModel.first({
          value: capability.level_value,
          category_capability_id: testCapability.id,
        });

        if (testLevel) {
          assetTest.capabilities[testCapability.id] = testLevel.id;
        }
      }
    }
  }
  await assetTestModel.add(assetTest);
}

async function addAssets(asset) {
  const assetTests = asset.asset_tests;

  delete asset.asset_tests;
  const newAsset = await assetModel.add(asset);
  if (!isUndefined(assetTests) && isArray(assetTests)) {
    for (const assetTest of assetTests) {
      assetTest.asset_id = newAsset.id;
      await addAssetTests(assetTest);
    }
  }
}

async function loadDb(dbData) {
  const tempAllData = cloneDeep(dbData);
  // Clear previous
  await assetModel.deleteAll();
  await assetGroupModel.deleteAll();
  await assetTestModel.deleteAll();
  await categoryModel.deleteAll();
  await capabilityModel.deleteAll();
  await levelModel.deleteAll();

  await dbVersion.setKey(1);

  for (const category of tempAllData.categories) {
    await addCategory(category);
  }

  if (tempAllData.assets) {
    for (const asset of tempAllData.assets) {
      await addAssets(asset);
    }
  }

  if (tempAllData.assetGroups) {
    for (const assetGroup of tempAllData.assetGroups) {
      await assetGroupModel.add(assetGroup);
    }
  }
}

const initialiseResponse = asyncMiddleware(async (req, res) => {
  loadDb(allData)
    .then(() => {
      res.send({
        msg: 'done',
      });
    })
    .catch(console.error);
});

const loadDbResponse = asyncMiddleware(async (req, res) => {
  let allDataPost = {};
  if (isString(req.body.data)) {
    allDataPost = JSON.parse(req.body.data);
  } else {
    allDataPost = req.body.data;
  }
  loadDb(allDataPost)
    .then(() => {
      res.send({
        msg: 'done',
      });
    })
    .catch(console.error);
});

export default {
  initialiseDB: initialiseResponse,
  loadDb: loadDbResponse,
};

