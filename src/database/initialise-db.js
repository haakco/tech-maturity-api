/* eslint-disable no-restricted-syntax,no-await-in-loop */
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import cloneDeep from 'lodash/cloneDeep';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTypeModel from '../model/asset_type.model';
import capabilityModel from '../model/category_capability.model';
import categoryModel from '../model/category.model';
import dbVersion from '../model/db_version.model';
import levelModel from '../model/category_capability_level.model';
import allData from './migrations/allData';
import assetModel from '../model/asset.model';
import assetTestModel from '../model/asset_test.model';

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

async function initialiseDB() {
  const tempAllData = cloneDeep(allData);

  // Clear previous
  await assetModel.deleteAll();
  await assetTestModel.deleteAll();
  await assetTypeModel.deleteAll();
  await categoryModel.deleteAll();
  await capabilityModel.deleteAll();
  await levelModel.deleteAll();

  console.log('start');
  await dbVersion.setKey(1);
  console.log('set db version');

  for (const assetType of tempAllData.asset_types) {
    await assetTypeModel
      .add(assetType);
  }

  console.log('add asset type');


  console.log('add categories type');

  for (const category of tempAllData.categories) {
    await addCategory(category);
  }
}

export const initialiseResponse = asyncMiddleware(async (req, res) => {
  initialiseDB()
    .then(() => {
      res.send({
        msg: 'done',
      });
    })
    .catch(console.error);
});

export default initialiseDB;

