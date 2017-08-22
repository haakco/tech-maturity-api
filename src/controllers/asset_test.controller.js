import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTestModel from '../model/asset_test.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await assetTestModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const assetId = req.body.asset_id;

  const assetTestResult = await assetTestModel.findBy({
    asset_id: assetId,
  });

  const maxAssetTest = assetTestResult
    .filter(assetTestItem => assetTestItem.completed_at !== null)
    .reduce((prev, curr) => {
      if (!curr) {
        return prev;
      }
      if (!prev) {
        return curr;
      }
      return prev.completed_at > curr.completed_at ? prev : curr;
    }, null);

  let assetTest = {
    asset_id: assetId,
    answered_count: 0,
    completed_at: null,
    capabilities:{},
  };

  if (maxAssetTest && maxAssetTest.completed_at && maxAssetTest.completed_at !== null) {
    assetTest.capabilities = maxAssetTest.capabilities;
  }

  assetTest = await assetTestModel.add(assetTest);

  res.send(assetTest);
});

const update = asyncMiddleware(async (req, res) => {
  const id = req.body.id;
  const assetId = req.body.asset_id;
  const capabilities = req.body.capabilities;
  const answeredCount = req.body.answered_count;
  const completedAt = req.body.completed_at;

  let assetTest = await assetTestModel.find(id);

  assetTest.asset_id = assetId;
  assetTest.capabilities = capabilities;
  assetTest.answered_count = answeredCount;
  assetTest.completed_at = completedAt;

  assetTest = await assetTestModel.update(assetTest);
  res.send(assetTest);
});

const assetTestController = {
  index,
  add,
  update,
};

export default assetTestController;
