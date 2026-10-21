# Anime & Manga Library

A responsive catalog for browsing anime and manga, viewing title details, and managing a personal watch/read list. The midterm app extends the existing Task 4 React/Vite project and keeps its warm paper, coral, and teal visual theme.

## Features

- Browse a seeded catalog of 100+ anime and manga titles.
- Search names, descriptions, and genres; filter by format and watch status.
- Sort by title, release year, or score in ascending or descending order.
- Paginate results and choose how many titles appear on each page.
- Select a title to view its details, edit all catalog fields, or update its status.
- Add new titles with a controlled form and delete titles from the library.
- Reload the list and see loading, error, empty, and success states.

## Tech stack

- React 19
- Vite
- JavaScript and CSS
- Browser `localStorage` with a small asynchronous fake API

## Run locally

From the `midterm` directory:

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run preview` to preview it locally.

## Data and API

The fake API in `src/fake-api/fakeApi.js` reads and writes the catalog in browser `localStorage`. The first visit seeds it from `src/fake-api/initial-data-sample.js`. When an older, smaller Task 4 catalog is already saved, the API merges in the expanded seed while preserving matching saved titles and custom titles.

List requests use query parameters for `search`, `status`, `type`, `sort`, `order`, `page`, and `limit`. Search includes title, description, and genre. Create, detail, update, and delete operations are asynchronous and simulate network delay and occasional errors; data remains local to the browser.

To reset the catalog to the current seed, clear the `fake-init-data` entry in the browser's local storage and reload the app.

## Deployment

The Vite base path and package homepage are configured for GitHub Pages at `/React/`. Deploy with `npm run deploy`.

Deployed link: **[Add deployed URL here]**
