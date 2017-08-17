import asyncMiddleware from '../middleware/asyncMiddleware';
import categoryModel from '../model/category.model';

const index = asyncMiddleware(async (req, res) => {
  res.send(await categoryModel.get());
});

const add = asyncMiddleware(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const category = await categoryModel.add({
    name,
    description,
  });
  res.send(category);
});

const update = asyncMiddleware(async (req, res) => {

  const id = req.body.category_id;

  let category = await categoryModel.find(id);

  category.name = req.body.name;
  category.description = req.body.description;

  category = await categoryModel.update(category);
  res.send(category);
});

const del = asyncMiddleware(async (req, res) => {
  const id = req.body.category_id;

  const category = await categoryModel.delById(id);

  res.send(category);
});

const categoriesController = {
  index,
  add,
  update,
  del,
};

export default categoriesController;
