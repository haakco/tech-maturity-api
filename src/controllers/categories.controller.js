import asyncMiddleware from '../middleware/asyncMiddleware';
import categoryModel from '../model/category.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await categoryModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.param('name');
  const description = req.param('description');

  await categoryModel.add({
    name,
    description,
  });
  return index(req, res);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.param('category_id');

  const category = categoryModel.find(id);

  category.name = req.param('name');
  category.description = req.param('description');

  await categoryModel.update(category);
  return index(req, res);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.param('category_id');

  await categoryModel.delById(id);
  return index(req, res);
});

const categoriesController = {
  index,
  add,
  update,
  del,
};

export default categoriesController;
