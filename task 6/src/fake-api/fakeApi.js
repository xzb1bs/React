const STORAGE_KEY = 'anime-manga-library';

const seedItems = [
  { id: 1, name: 'Cowboy Bebop', type: 'Anime', year: 1998, score: 8.75, episodes: 26, genre: 'Action, Sci-Fi', status: 'Completed', description: 'Bounty hunters roam the solar system in this stylish space-western.' },
  { id: 2, name: 'Fullmetal Alchemist: Brotherhood', type: 'Anime', year: 2009, score: 9.10, episodes: 64, genre: 'Adventure, Fantasy', status: 'Completed', description: 'Two brothers search for the Philosopher’s Stone after an alchemy accident.' },
  { id: 3, name: 'Attack on Titan', type: 'Anime', year: 2013, score: 8.55, episodes: 89, genre: 'Action, Drama', status: 'Watching', description: 'Humanity fights for survival inside walls against enormous Titans.' },
  { id: 4, name: 'Spirited Away', type: 'Anime', year: 2001, score: 8.77, episodes: 1, genre: 'Fantasy, Adventure', status: 'Completed', description: 'A girl enters a mysterious spirit world to save her parents.' },
  { id: 5, name: 'Frieren: Beyond Journey’s End', type: 'Anime', year: 2023, score: 9.30, episodes: 28, genre: 'Adventure, Fantasy', status: 'Watching', description: 'An elven mage journeys through a world changed by her former companions.' },
  { id: 6, name: 'Demon Slayer', type: 'Anime', year: 2019, score: 8.44, episodes: 63, genre: 'Action, Fantasy', status: 'Watching', description: 'A kindhearted swordsman seeks a cure for his demonized sister.' },
  { id: 7, name: 'Vinland Saga', type: 'Anime', year: 2019, score: 8.78, episodes: 48, genre: 'Action, Historical', status: 'Planned', description: 'A young Viking warrior searches for purpose amid war and revenge.' },
  { id: 8, name: 'Your Name', type: 'Anime', year: 2016, score: 8.84, episodes: 1, genre: 'Romance, Fantasy', status: 'Completed', description: 'Two teenagers mysteriously begin swapping bodies.' },
  { id: 9, name: 'One Piece', type: 'Manga', year: 1997, score: 9.22, episodes: 1150, genre: 'Adventure, Fantasy', status: 'Watching', description: 'A pirate captain and his crew search for the legendary One Piece.' },
  { id: 10, name: 'Vagabond', type: 'Manga', year: 1998, score: 9.25, episodes: 327, genre: 'Action, Historical', status: 'Completed', description: 'A fictional account of the life and swordsmanship of Musashi Miyamoto.' },
  { id: 11, name: 'Monster', type: 'Manga', year: 1994, score: 9.16, episodes: 162, genre: 'Mystery, Thriller', status: 'Completed', description: 'A surgeon pursues a former patient who became a brilliant killer.' },
  { id: 12, name: 'A Silent Voice', type: 'Manga', year: 2013, score: 8.93, episodes: 62, genre: 'Drama, Romance', status: 'Completed', description: 'A former bully attempts to make amends with a deaf classmate.' },
];

function readItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore unavailable or malformed browser storage and use the seed catalog.
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
  return seedItems;
}

function writeItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

export async function getItemsList(query = '') {
  await Promise.resolve();
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  let items = readItems();
  const search = params.get('search')?.trim().toLowerCase() || '';
  const status = params.get('status') || '';
  const type = params.get('type') || '';

  if (search) items = items.filter((item) => `${item.name} ${item.genre} ${item.description}`.toLowerCase().includes(search));
  if (status) items = items.filter((item) => item.status === status);
  if (type) items = items.filter((item) => item.type === type);

  const sort = params.get('sort') || 'name';
  const order = params.get('order') === 'desc' ? -1 : 1;
  items = [...items].sort((a, b) => {
    const left = a[sort];
    const right = b[sort];
    if (typeof left === 'number' && typeof right === 'number') return (left - right) * order;
    return String(left ?? '').localeCompare(String(right ?? '')) * order;
  });

  const total = items.length;
  const limit = Math.max(1, params.get('limit') === 'all'
    ? total
    : (Number(params.get('limit')) || 12));
  const page = Math.max(1, Number(params.get('page')) || 1);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const data = items.slice((safePage - 1) * limit, safePage * limit);
  return { data, total, page: safePage, limit, totalPages };
}

export async function getItem(id) {
  await Promise.resolve();
  const item = readItems().find((entry) => String(entry.id) === String(id));
  if (!item) throw new Error('Title not found');
  return item;
}

export async function createItem(item) {
  await Promise.resolve();
  const items = readItems();
  const created = { ...item, id: nextId(items) };
  writeItems([...items, created]);
  return created;
}

export async function updateItem(id, changes) {
  await Promise.resolve();
  const items = readItems();
  const index = items.findIndex((item) => String(item.id) === String(id));
  if (index < 0) throw new Error('Title not found');
  const updated = { ...items[index], ...changes, id: items[index].id };
  items[index] = updated;
  writeItems(items);
  return updated;
}

export async function deleteItem(id) {
  await Promise.resolve();
  const items = readItems();
  if (!items.some((item) => String(item.id) === String(id))) throw new Error('Title not found');
  writeItems(items.filter((item) => String(item.id) !== String(id)));
  return true;
}
