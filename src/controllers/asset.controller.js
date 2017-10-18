import asyncMiddleware from '../middleware/asyncMiddleware';
import assetModel from '../model/asset.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await assetModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.body.name;

  const assetResult = await assetModel.findBy({
    name,
  });

  if (assetResult.length > 0) {
    res.status(422);
    return res.send({
      err: `Duplicate name`,
    });
  }

  const asset = await assetModel.add({
    name,
  });
  res.send(asset);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.body.asset_id;

  let asset = await assetModel.find(id);

  asset.name = req.body.name;
  if (asset.asset_type_id) {
    delete asset.asset_type_id;
  }
  asset = await assetModel.update(asset);
  res.send(asset);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.body.asset_id;

  const asset = await assetModel.delById(id);
  res.send(asset);
});

const assetController = {
  index,
  add,
  update,
  del,
};

export default assetController;
