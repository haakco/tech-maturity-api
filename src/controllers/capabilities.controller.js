import asyncMiddleware from '../middleware/asyncMiddleware';
import capabilityModel from '../model/category_capability.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await capabilityModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.param('name');
  const description = req.param('description');
  const minimumCategoryCapabilityLevelId = req.param('minimum_category_capability_level_id');
  const categoryId = req.param('category_id');

  await capabilityModel.add({
    name,
    description,
    minimum_category_capability_level_id: minimumCategoryCapabilityLevelId,
    category_id: categoryId,
  });
  return index(req, res);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.param('category_capability_id');

  const capability = capabilityModel.find(id);

  capability.name = req.param('name');
  capability.description = req.param('description');
  capability.minimum_category_capability_level_id = req.param('minimum_category_capability_level_id');

  await capabilityModel.update(capability);
  return index(req, res);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.param('category_capability_id');

  await capabilityModel.delById(id);
  return index(req, res);
});

const capabilitiesController = {
  index,
  add,
  update,
  del,
};

export default capabilitiesController;
