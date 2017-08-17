import asyncMiddleware from '../middleware/asyncMiddleware';
import capabilityModel from '../model/category_capability.model';
import levelModel from '../model/category_capability_level.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await levelModel.get());
});

const add = asyncMiddleware(async (req, res) => {

  const capabilityId = req.body.category_capability_id;
  const levelValue = req.body.level;
  const value = req.body.value;

  const capability = await capabilityModel.find(capabilityId);

  const level = await levelModel.add({
    category_id: capability.category_id,
    category_capability_id: capability.id,
    level: levelValue,
    value,
  });
  res.send(level);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.body.category_capability_level_id;

  let level = await levelModel.find(id);

  level.level = req.body.level;
  level.value = req.body.value;

  level = await levelModel.update(level);

  res.send(level);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.body.category_capability_level_id;

  const level = await levelModel.delById(id);
  res.send(level);
});

const levelsController = {
  index,
  add,
  update,
  del,
};

export default levelsController;
