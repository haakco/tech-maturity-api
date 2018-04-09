import { uniq as lodashUniq } from 'lodash';
import asyncMiddleware from '../middleware/asyncMiddleware';
import assetGroupModel from '../model/asset_group.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await assetGroupModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.body.name;

  const assetGroupResult = await assetGroupModel.findBy({
    name,
  });

  if (assetGroupResult.length > 0) {
    res.status(422);
    return res.send({
      err: `Duplicate name`,
    });
  }

  if (name.length < 4) {
    res.status(422);
    return res.send({
      err: `Name to short`,
    });
  }

  let assetGroup = {
    name,
    assets: [],
    sub_groups: [],
  };

  assetGroup = await assetGroupModel.add(assetGroup);

  return res.send(assetGroup);
});

const addAssetsToAssetGroup = asyncMiddleware(async (req, res) => {
  const assetGroupId = req.body.asset_group_id;
  const assetIds = req.body.asset_ids;

  let assetGroup = await assetGroupModel.first({
    id: assetGroupId,
  });

  if (!assetGroup) {
    res.status(404);
    return res.send({
      err: `Invalid asset group`,
    });
  }

  assetGroup.assets = assetIds;

  assetGroup.assets = lodashUniq(assetGroup.assets);

  assetGroup = await assetGroupModel.update(assetGroup);

  return res.send(assetGroup);
});

const addAssetGroupsToAssetGroup = asyncMiddleware(async (req, res) => {
  const assetGroupId = req.body.asset_group_id;
  const subAssetGroups = req.body.asset_group_sub_group_ids;

  let assetGroup = await assetGroupModel.first({
    id: assetGroupId,
  });

  if (!assetGroup) {
    res.status(404);
    return res.send({
      err: `Invalid asset group`,
    });
  }

  assetGroup.sub_groups = subAssetGroups;
  assetGroup.sub_groups = lodashUniq(assetGroup.sub_groups);

  assetGroup = await assetGroupModel.update(assetGroup);

  return res.send(assetGroup);
});

const del = asyncMiddleware(async (req, res) => {
  const assetGroupId = req.params.asset_group_id;
  const assetGroup = await assetGroupModel.find(assetGroupId);
  await assetGroupModel.del(assetGroup);
  res.send(assetGroup);
});

const assetGroupController = {
  index,
  add,
  addAssetToAssetGroup: addAssetsToAssetGroup,
  addAssetGroupToAssetGroup: addAssetGroupsToAssetGroup,
  del,
};

export default assetGroupController;
