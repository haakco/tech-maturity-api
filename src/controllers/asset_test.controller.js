import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTestModel from '../model/asset_test.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await assetTestModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const assetId = req.body.asset_id;

  const assetTest = await assetTestModel.add({
    asset_id: assetId,
    answered_count: 0,
    capabilities: {},
  });

  res.send(assetTest);
});

const update = asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const capabilities = req.body.capabilities;
  const answeredCount = req.body.answered_count;

  let assetTest = await assetTestModel.find(id);

  assetTest.capabilities = capabilities;
  assetTest.answered_count = answeredCount;

  assetTest = await assetTestModel.update(assetTest);
  res.send(assetTest);
});

const assetTestController = {
  index,
  add,
  update,
};

export default assetTestController;
