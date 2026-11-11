# Task 6 — Anime & Manga Library

This project extends Task 5. It keeps the catalog, URL-based search and filters,
sorting, pagination, title details, and dashboard, and adds Firebase
authentication and API response caching.

## Run locally

1. Install Node.js and run `npm install`.
2. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
3. In **Authentication → Sign-in method**, enable **Email/Password** and **Google**.
4. In **Project settings → General**, register a Web app and copy its Firebase config.
5. Copy `.env.example` to `.env.local` and fill in the values from that config.
6. Run `npm run dev`. Use `npm run build` to create the production build.

The Firebase web configuration is supplied through Vite's `VITE_` environment
variables. `.env.local` is ignored by Git; do not commit it. The Firebase web
config identifies the project and is not a server-side secret. For a deployed
app, add the same variables to the hosting provider's environment settings and
add the deployed domain to Firebase Authentication's **Authorized domains**.

## Authentication

The app uses Firebase Authentication for email/password signup and login,
Google popup login, and logout. The auth context watches Firebase's auth state,
uses browser-local persistence, and exposes a loading state while the saved
session is restored. `/profile` is protected and sends signed-out visitors to
`/login`.

## Caching

`src/services/service.js` caches title-list responses by their normalized query
parameters and title details by ID for 30 seconds. Concurrent requests for the
same key share one request. Expired entries are fetched again. Creating,
updating, or deleting a title clears the list and detail caches. A generation
check prevents a request started before an invalidation from writing old data
back into the cache. Screens also ignore results from requests that are no
longer current.

The catalog is still the Task 5 localStorage-backed fake API; cached responses
are kept in memory and are cleared on a page refresh.
