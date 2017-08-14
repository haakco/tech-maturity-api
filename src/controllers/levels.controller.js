import asyncMiddleware from '../middleware/asyncMiddleware';
import capabilityModel from '../model/category_capability.model';
import levelModel from '../model/category_capability_level.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await levelModel.get());
});

const add = asyncMiddleware(async (req, res) => {

  const capabilityId = req.param('category_capability_id');
  const level = req.param('level');
  const value = req.param('value');

  const capability = capabilityModel.find(capabilityId);

  await levelModel.add({
    category_id: capability.category_id,
    category_capability_id: capability.id,
    level,
    value,
  });
  return index(req, res);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.param('category_capability_level_id');

  const level = levelModel.find(id);

  level.level = req.param('level');
  level.value = req.param('value');

  await levelModel.update(level);
  return index(req, res);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.param('category_capability_level_id');

  await levelModel.delById(id);
  return index(req, res);
});

const levelsController = {
  index,
  add,
  update,
  del,
};

export default levelsController;
