import {
  getItemsList as fetchItemsList,
  getItem as fetchItem,
  createItem as createStoredItem,
  updateItem as updateStoredItem,
  deleteItem as deleteStoredItem,
} from '../fake-api/fakeApi.js';

const CACHE_TIME = 30_000;
const PERSISTENT_CACHE_NAME = 'react-pwa-api-v1';
const PERSISTENT_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const MAX_PERSISTENT_ENTRIES = 50;
const cache = new Map();
const pendingRequests = new Map();
let cacheGeneration = 0;

function getPersistentRequest(key) {
  return new Request(
    new URL(`/__pwa_cache__/public/${encodeURIComponent(key)}`, window.location.origin),
  );
}

function isOnline() {
  return typeof navigator === 'undefined' || navigator.onLine;
}

function withCacheStatus(data, fromCache) {
  return data && typeof data === 'object'
    ? { ...data, fromCache }
    : data;
}

async function readPersistentData(key) {
  if (!('caches' in globalThis)) return null;

  try {
    const persistentCache = await caches.open(PERSISTENT_CACHE_NAME);
    const request = getPersistentRequest(key);
    const response = await persistentCache.match(request);
    if (!response) return null;

    const saved = await response.json();
    if (!saved.savedAt || Date.now() - saved.savedAt > PERSISTENT_CACHE_TTL) {
      await persistentCache.delete(request);
      return null;
    }
    return saved.data;
  } catch (error) {
    console.warn('Could not read the saved public catalog cache.', error);
    return null;
  }
}

async function writePersistentData(key, data) {
  if (!('caches' in globalThis)) return;

  try {
    const persistentCache = await caches.open(PERSISTENT_CACHE_NAME);
    const request = getPersistentRequest(key);
    const entries = (await persistentCache.keys()).filter((entry) => (
      new URL(entry.url).pathname.startsWith('/__pwa_cache__/public/')
    ));
    while (entries.length >= MAX_PERSISTENT_ENTRIES) {
      await persistentCache.delete(entries.shift());
    }
    await persistentCache.put(request, new Response(JSON.stringify({
      savedAt: Date.now(),
      data,
    }), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
    }));
  } catch (error) {
    console.warn('Could not save the public catalog cache.', error);
  }
}

async function clearPersistentData() {
  if (!('caches' in globalThis)) return;

  try {
    await caches.delete(PERSISTENT_CACHE_NAME);
  } catch (error) {
    console.warn('Could not clear the saved public catalog cache.', error);
  }
}

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
    return Promise.resolve(withCacheStatus(cached.data, !isOnline()));
  }

  const pending = pendingRequests.get(key);
  if (pending) return pending;

  const savedData = !isOnline() ? readPersistentData(key) : Promise.resolve(null);
  const requestGeneration = cacheGeneration;
  const requestPromise = savedData.then((saved) => {
    if (saved !== null) {
      cache.set(key, { data: saved, expiresAt: Date.now() + CACHE_TIME });
      return withCacheStatus(saved, true);
    }

    return Promise.resolve()
      .then(request)
      .then(async (data) => {
        if (requestGeneration === cacheGeneration) {
          cache.set(key, { data, expiresAt: Date.now() + CACHE_TIME });
          await writePersistentData(key, data);
        }
        return withCacheStatus(data, !isOnline());
      })
      .catch(async (error) => {
        const savedResponse = await readPersistentData(key);
        if (savedResponse !== null) {
          cache.set(key, { data: savedResponse, expiresAt: Date.now() + CACHE_TIME });
          return withCacheStatus(savedResponse, true);
        }
        throw error;
      });
  }).finally(() => {
    if (pendingRequests.get(key) === requestPromise) {
      pendingRequests.delete(key);
    }
  });

  pendingRequests.set(key, requestPromise);
  return requestPromise;
}

async function invalidateItemsCache() {
  cacheGeneration += 1;
  cache.clear();
  pendingRequests.clear();
  await clearPersistentData();
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
  await invalidateItemsCache();
  return created;
}

export async function updateItem(id, changes) {
  const updated = await updateStoredItem(id, changes);
  await invalidateItemsCache();
  return updated;
}

export async function deleteItem(id) {
  const deleted = await deleteStoredItem(id);
  await invalidateItemsCache();
  return deleted;
}