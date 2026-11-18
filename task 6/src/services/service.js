import {
  getItemsList as fetchItemsList,
  getItem as fetchItem,
  createItem as createStoredItem,
  updateItem as updateStoredItem,
  deleteItem as deleteStoredItem,
} from '../fake-api/fakeApi.js';

const CACHE_TIME = 30_000;
const cache = new Map();
const pendingRequests = new Map();
let cacheGeneration = 0;

function getListKey(query) {
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  const entries = [...params.entries()].sort(([keyA, valueA], [keyB, valueB]) => (
    keyA.localeCompare(keyB) || valueA.localeCompare(valueB)
  ));
  return JSON.stringify(['items', 'list', entries]);
}

function getCachedData(key, request) {
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.data);
  }

  const pending = pendingRequests.get(key);
  if (pending) return pending;

  const requestGeneration = cacheGeneration;
  const requestPromise = Promise.resolve()
    .then(request)
    .then((data) => {
      if (requestGeneration === cacheGeneration) {
        cache.set(key, { data, expiresAt: Date.now() + CACHE_TIME });
      }
      return data;
    })
    .finally(() => {
      if (pendingRequests.get(key) === requestPromise) {
        pendingRequests.delete(key);
      }
    });

  pendingRequests.set(key, requestPromise);
  return requestPromise;
}

function invalidateItemsCache() {
  cacheGeneration += 1;
  cache.clear();
  pendingRequests.clear();
}

export function getItemsList(query = '') {
  return getCachedData(getListKey(query), () => fetchItemsList(query));
}

export function getItem(id) {
  return getCachedData(
    JSON.stringify(['items', 'detail', String(id)]),
    () => fetchItem(id),
  );
}

export async function createItem(item) {
  const created = await createStoredItem(item);
  invalidateItemsCache();
  return created;
}

export async function updateItem(id, changes) {
  const updated = await updateStoredItem(id, changes);
  invalidateItemsCache();
  return updated;
}

export async function deleteItem(id) {
  const deleted = await deleteStoredItem(id);
  invalidateItemsCache();
  return deleted;
}