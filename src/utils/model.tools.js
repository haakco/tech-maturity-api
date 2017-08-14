import values from 'lodash/values';
import * as uuid from 'uuid';
import DataBase from '../database/db';

let db;

async function get(key) {
  const items = await db.getAsync(key);
  return values(items);
}

async function find(key, id) {
  const items = await db.getAsync(key);
  return items[id];
}

async function add(key, item) {
  if (!item.id) {
    item.id = uuid.v4();
  }
  item.created_at = new Date();
  item.updated_at = new Date();
  const items = await db.getAsync(key);
  items[item.id] = item;
  await db.putAsync(key, items);
  return items[item.id];
}

async function update(key, item) {
  item.updated_at = new Date();
  const items = await get(key);
  items[item.id] = item;
  await db.putAsync(key, items);
  return items[item.id];
}

async function delById(key, id) {
  const items = await get(key);
  const deletedItem = items[id];
  delete items[id];
  await db.putAsync(key, items);
  return deletedItem;
}

async function del(key, item) {
  return delById(key, item.id);
}

async function addAll(key, items) {
  await db.putAsync(key, items);
}

async function deleteAll(key) {
  await db.putAsync(key, {});
}

async function setKey(key, item) {
  await db.putAsync(key, item);
}

async function getKey(key, item) {
  await db.getAsync(key, item);
}

function buildModel(key) {
  const useKey = key;
  return {
    get: async () => get(useKey),
    find: async id => find(useKey, id),
    add: async item => add(useKey, item),
    update: async item => update(useKey, item),
    del: async item => del(useKey, item),
    delById: async id => delById(useKey, id),
    addAll: async () => addAll(useKey),
    deleteAll: async () => deleteAll(useKey),
    getKey: async item => getKey(useKey, item),
    setKey: async item => setKey(useKey, item),
  };
}

export default buildModel;

if (!db) {
  db = DataBase();
}
