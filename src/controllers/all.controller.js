import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import values from 'lodash/values';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTypeModel from '../model/asset_type.model';
import capabilityModel from '../model/category_capability.model';
import categoryModel from '../model/category.model';
import levelModel from '../model/category_capability_level.model';

function cleanAll(item) {
  delete item.id;
  delete item.created_at;
  delete item.updated_at;
  delete item.category_id;
  delete item.category_capability_id;
  return item;
}

const index = asyncMiddleware(async (req, res) => {
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
  res.send(response);
});

const allController = {
  index,
};

export default allController;
