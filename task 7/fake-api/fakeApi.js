import { API_CONFIG, DATA_KEY, DATA_VERSION_KEY } from "./settings.js";
import { initialDataSample } from "./initial-data-sample.js";

const DATA_VERSION = "2";

function fakeRequest(operation, options = {}) {
  const {
    minDelay = API_CONFIG.minDelay,
    maxDelay = API_CONFIG.maxDelay,
    errorChance = API_CONFIG.errorChance,
  } = options;

  return new Promise((resolve, reject) => {
    const delayMS =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    setTimeout(() => {
      if (Math.random() < errorChance) {
        reject(new Error("Simulated server Error"));
        return;
      }

      try {
        resolve(operation());
      } catch (error) {
        reject(error);
      }
    }, delayMS);
  });
}

function initializeDatabase() {
  const savedVersion = localStorage.getItem(DATA_VERSION_KEY);
  const savedData = localStorage.getItem(DATA_KEY);

  if (!savedData) {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
    localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
    return;
  }

  if (savedVersion === DATA_VERSION) return;

  const items = JSON.parse(savedData);
  const existingNames = items.map(
    (item) => `${item.name.toLowerCase()}|${item.type}`,
  );
  let nextId = Math.max(0, ...items.map((item) => item.id)) + 1;

  initialDataSample.forEach((item) => {
    const itemName = `${item.name.toLowerCase()}|${item.type}`;

    if (!existingNames.includes(itemName)) {
      items.push({ ...item, id: nextId });
      existingNames.push(itemName);
      nextId += 1;
    }
  });

  localStorage.setItem(DATA_KEY, JSON.stringify(items));
  localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION);
}

function readData() {
  return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
}

function writeData(items) {
  localStorage.setItem(DATA_KEY, JSON.stringify(items));
}

initializeDatabase();

export async function getItemsList(query = "") {
  return fakeRequest(() => {
    const params = new URLSearchParams(query);
    const search = (params.get("search") || "").trim().toLowerCase();
    const sort = params.get("sort") || "name";
    const order = params.get("order") || "asc";
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.max(1, Number(params.get("limit")) || 10);
    const status = params.get("status");
    const type = params.get("type");

    let items = readData();

    if (search) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.genre.toLowerCase().includes(search),
      );
    }
    if (status) items = items.filter((item) => item.status === status);
    if (type) items = items.filter((item) => item.type === type);

    const legacySortMatch = sort.match(/^(name|year|score)-(asc|desc)$/);
    const sortField = legacySortMatch ? legacySortMatch[1] : sort;
    const sortOrder = legacySortMatch ? legacySortMatch[2] : order;
    const direction = sortOrder === "desc" ? -1 : 1;
    const supportedSortFields = ["name", "year", "score"];
    const field = supportedSortFields.includes(sortField) ? sortField : "name";

    items = [...items].sort((first, second) => {
      if (field === "name") {
        return direction * first.name.localeCompare(second.name);
      }

      return direction * (Number(first[field]) - Number(second[field]));
    });

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;

    const data = items.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  });
}

export async function getItem(id) {
  return fakeRequest(() => {
    const items = readData();

    const item = items.find((item) => item.id === Number(id));

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  });
}

export async function createItem(data) {
  return fakeRequest(() => {
    const items = readData();

    const nextId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

    const newItem = {
      ...data,
      id: nextId,
    };

    writeData([...items, newItem]);

    return newItem;
  });
}

export async function updateItem(id, changes) {
  return fakeRequest(() => {
    const numericId = Number(id);
    const items = readData();

    const exists = items.some((item) => item.id === numericId);

    if (!exists) {
      throw new Error("Item not found");
    }

    const updatedItems = items.map((item) =>
      item.id === numericId
        ? {
            ...item,
            ...changes,
            id: numericId,
          }
        : item,
    );

    writeData(updatedItems);

    return updatedItems.find((item) => item.id === numericId);
  });
}

export async function deleteItem(id) {
  return fakeRequest(() => {
    const numericId = Number(id);
    const items = readData();

    const exists = items.some((item) => item.id === numericId);

    if (!exists) {
      throw new Error("Item not found");
    }

    const updatedItems = items.filter((item) => item.id !== numericId);

    writeData(updatedItems);

    return {
      success: true,
      id: numericId,
    };
  });
}