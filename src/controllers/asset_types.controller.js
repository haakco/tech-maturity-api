import asyncMiddleware from '../middleware/asyncMiddleware';
import assetTypeModel from '../model/asset_type.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await assetTypeModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.body.name;
  const assetType = await assetTypeModel.add({
    name,
  });

  res.send(assetType);
});

const assetTypes = {
  index,
  add,
};

export default assetTypes;
