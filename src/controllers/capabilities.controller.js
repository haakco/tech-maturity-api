import asyncMiddleware from '../middleware/asyncMiddleware';
import capabilityModel from '../model/category_capability.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await capabilityModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const minimumCategoryCapabilityLevelId = req.body.minimum_category_capability_level_id;
  const categoryId = req.body.category_id;

  const capability = await capabilityModel.add({
    name,
    description,
    minimum_category_capability_level_id: minimumCategoryCapabilityLevelId,
    category_id: categoryId,
  });
  res.send(capability);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.body.category_capability_id;

  let capability = await capabilityModel.find(id);

  capability.name = req.body.name;
  capability.description = req.body.description;
  capability.minimum_category_capability_level_id = req.body.minimum_category_capability_level_id;

  capability = await capabilityModel.update(capability);
  res.send(capability);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.body.category_capability_id;

  const capability = await capabilityModel.delById(id);
  res.send(capability);
});

const capabilitiesController = {
  index,
  add,
  update,
  del,
};

export default capabilitiesController;
