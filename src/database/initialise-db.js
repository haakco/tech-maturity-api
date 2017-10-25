import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
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

  if (tempAllData.asset_groups) {
    const assetGroupGroupsTemp = [];
    for (const assetGroup of tempAllData.asset_groups) {
      const newAssetGroup = {
        name: assetGroup.name,
        assets: [],
        sub_groups: [],
        created_at: assetGroup.created_at,
      };
      const assetModels = assetModel.get();
      newAssetGroup.assets = assetGroup.assets
        .map((assetName) => {
          const asset = find(assetModels, { name: assetName });
          if (asset) {
            return asset.id;
          }
          return null;
        })
        .filter(assetId => assetId !== null);

      const tempAssetGroup = await assetGroupModel.add(newAssetGroup);
      if (assetGroup.sub_groups.length > 0) {
        assetGroupGroupsTemp.push({
          tempAssetGroup,
          sub_groups: assetGroup.sub_groups,
        });
      }
    }

    if (assetGroupGroupsTemp.length > 0) {
      const assetGroups = await assetGroupModel.get();
      for (const assetGroupGroupInfo of assetGroupGroupsTemp) {
        const assetGroupGroupIds = assetGroupGroupInfo.sub_groups.map(
          (assetGroupName) => {
            const assetGroup = find(assetGroups, { name: assetGroupName });
            if (assetGroup) {
              return assetGroup.id;
            }
            return null;
          }).filter(assetGroupId => assetGroupId !== null);
        assetGroupGroupInfo.tempAssetGroup.sub_groups = assetGroupGroupIds;
        await assetGroupModel.update(assetGroupGroupInfo.tempAssetGroup);
      }
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

