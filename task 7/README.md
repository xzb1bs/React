# Task 7 — Anime & Manga Library PWA

This project extends Task 6. It preserves the catalog, URL-based search and
filters, sorting, pagination, title details, dashboard, and Firebase
authentication, and adds installable PWA and offline support.

## Run locally

1. Install Node.js and run `npm install`.
2. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
3. In **Authentication → Sign-in method**, enable **Email/Password** and **Google**.
4. In **Firestore Database**, create a database for the project.
5. In **Project settings → General**, register a Web app and copy its Firebase config.
6. Copy `.env.example` to `.env.local` and fill in the values from that config.
7. Run `npm run dev`. Use `npm run build` to create the production build.

## Deploy to Firebase Hosting

The Firebase Hosting configuration publishes Vite's `dist` folder. Build from
the `task 7` directory so Vite can read `.env.local`, then deploy Hosting:

```powershell
npm run build
firebase deploy --only hosting
```

The `.firebaserc` file selects the Firebase project for deployment. If the
project does not match your own, select the correct one with `firebase use`.
For every new deploy, build the app again before deploying.

The Firebase web configuration is supplied through Vite's `VITE_` environment
variables when the app is built. `.env.local` is ignored by Git; do not commit
it. Firebase Hosting serves static files and does not inject environment
variables at runtime, so build from this directory while `.env.local` is
present. The Firebase web config is intended for client apps and is not a
server-side secret. Add the deployed domain to Firebase Authentication's
**Authorized domains**.

## Authentication

The app uses Firebase Authentication for email/password signup and login,
Google popup login, and logout. The auth context watches Firebase's auth state,
uses browser-local persistence, and exposes a loading state while the saved
session is restored. `/profile` is protected and sends signed-out visitors to
`/login`. A profile stores first name, last name, gender, and age in the
Firestore document `users/{uid}`. Firestore rules allow each signed-in user to
read and update only their own profile.

## PWA and offline support

The web app manifest and install icons are in `public/`. The Vite build creates
a versioned `dist/sw.js` and precaches the app shell, hashed JS/CSS bundles,
icons, catalog artwork, and the standalone offline page. The worker removes old
versioned shell and static caches when it activates. In-app navigation falls
back to the cached shell, and failed document navigation uses `offline.html`.

Static files use cache-first behavior. Public `/api/public/titles` GET requests
use network-first behavior and are cached only when they return successful JSON
without private/no-store cache directives or authorization headers. Runtime
caches are bounded and expire. Firebase auth and profile routes are excluded.
The existing catalog remains the localStorage-backed fake API from the earlier
homework; the list and detail responses it returns are also saved in Cache
Storage for seven days (up to 50 entries), so the catalog remains available
when the browser is offline. The app identifies saved catalog data and reports
connection status.

When a new build is available, the app offers an **Update now** button. The
waiting worker activates only after the user selects it, then the open app
reloads onto the new version. Service workers require HTTPS in deployment
(Firebase Hosting provides HTTPS); `localhost` is also supported for local
testing.

To check offline behavior, build and serve the production output, open the app
once while online, then use the browser’s developer tools to switch to offline
mode and reload a previously visited route such as `/titles`. The cached app
shell and catalog should remain available; an uncached navigation should show
the offline page.
