/* eslint-disable no-restricted-syntax,no-await-in-loop */
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTypeModel from '../model/asset_type.model';
import capabilityModel from '../model/capability.model';
import categoryModel from '../model/category.model';
import dbVersion from '../model/db_version.model';
import levelModel from '../model/level.model';
import allData from './migrations/allData';

async function addCapability(capability) {
  const levels = capability.levels;
  delete capability.levels;
  const newCapability = await capabilityModel.add(capability);

  if (!isUndefined(levels) && isArray(levels)) {

    for (const level of levels) {
      level.category_id = newCapability.category_id;
      level.capability_id = newCapability.id;
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
  console.log('start');
  await dbVersion.setKey(1);
  console.log('set db version');
  await assetTypeModel.deleteAll();

  for (const assetType of allData.asset_types) {
    await assetTypeModel
      .add(assetType);
  }

  console.log('add asset type');
  // Clear previous
  await categoryModel.deleteAll();
  await capabilityModel.deleteAll();
  await levelModel.deleteAll();


  console.log('add categories type');

  for (const category of allData.categories) {
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

