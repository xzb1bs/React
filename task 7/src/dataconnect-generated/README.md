# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetTitle*](#gettitle)
  - [*ListTitles*](#listtitles)
  - [*GetLibraryEntry*](#getlibraryentry)
  - [*ListLibraryEntries*](#listlibraryentries)
  - [*GetGenre*](#getgenre)
  - [*ListGenres*](#listgenres)
  - [*ListTitleGenres*](#listtitlegenres)
- [**Mutations**](#mutations)
  - [*InsertUser*](#insertuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*InsertTitle*](#inserttitle)
  - [*UpdateTitle*](#updatetitle)
  - [*DeleteTitle*](#deletetitle)
  - [*InsertLibraryEntry*](#insertlibraryentry)
  - [*UpdateLibraryEntry*](#updatelibraryentry)
  - [*DeleteLibraryEntry*](#deletelibraryentry)
  - [*InsertGenre*](#insertgenre)
  - [*UpdateGenre*](#updategenre)
  - [*DeleteGenre*](#deletegenre)
  - [*InsertTitleGenre*](#inserttitlegenre)
  - [*DeleteTitleGenre*](#deletetitlegenre)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
    bio?: string | null;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    username: string;
    avatarUrl?: string | null;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetTitle
You can execute the `GetTitle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTitle(options?: ExecuteQueryOptions): QueryPromise<GetTitleData, undefined>;

interface GetTitleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTitleData, undefined>;
}
export const getTitleRef: GetTitleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTitle(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTitleData, undefined>;

interface GetTitleRef {
  ...
  (dc: DataConnect): QueryRef<GetTitleData, undefined>;
}
export const getTitleRef: GetTitleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTitleRef:
```typescript
const name = getTitleRef.operationName;
console.log(name);
```

### Variables
The `GetTitle` query has no variables.
### Return Type
Recall that executing the `GetTitle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTitleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTitleData {
  title?: {
    titleName: string;
    description?: string | null;
  };
}
```
### Using `GetTitle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTitle } from '@dataconnect/generated';


// Call the `getTitle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTitle();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTitle(dataConnect);

console.log(data.title);

// Or, you can use the `Promise` API.
getTitle().then((response) => {
  const data = response.data;
  console.log(data.title);
});
```

### Using `GetTitle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTitleRef } from '@dataconnect/generated';


// Call the `getTitleRef()` function to get a reference to the query.
const ref = getTitleRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTitleRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.title);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.title);
});
```

## ListTitles
You can execute the `ListTitles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTitles(options?: ExecuteQueryOptions): QueryPromise<ListTitlesData, undefined>;

interface ListTitlesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTitlesData, undefined>;
}
export const listTitlesRef: ListTitlesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTitles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTitlesData, undefined>;

interface ListTitlesRef {
  ...
  (dc: DataConnect): QueryRef<ListTitlesData, undefined>;
}
export const listTitlesRef: ListTitlesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTitlesRef:
```typescript
const name = listTitlesRef.operationName;
console.log(name);
```

### Variables
The `ListTitles` query has no variables.
### Return Type
Recall that executing the `ListTitles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTitlesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTitlesData {
  titles: ({
    titleName: string;
    releaseYear?: number | null;
  })[];
}
```
### Using `ListTitles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTitles } from '@dataconnect/generated';


// Call the `listTitles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTitles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTitles(dataConnect);

console.log(data.titles);

// Or, you can use the `Promise` API.
listTitles().then((response) => {
  const data = response.data;
  console.log(data.titles);
});
```

### Using `ListTitles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTitlesRef } from '@dataconnect/generated';


// Call the `listTitlesRef()` function to get a reference to the query.
const ref = listTitlesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTitlesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.titles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.titles);
});
```

## GetLibraryEntry
You can execute the `GetLibraryEntry` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLibraryEntry(options?: ExecuteQueryOptions): QueryPromise<GetLibraryEntryData, undefined>;

interface GetLibraryEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLibraryEntryData, undefined>;
}
export const getLibraryEntryRef: GetLibraryEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLibraryEntry(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetLibraryEntryData, undefined>;

interface GetLibraryEntryRef {
  ...
  (dc: DataConnect): QueryRef<GetLibraryEntryData, undefined>;
}
export const getLibraryEntryRef: GetLibraryEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLibraryEntryRef:
```typescript
const name = getLibraryEntryRef.operationName;
console.log(name);
```

### Variables
The `GetLibraryEntry` query has no variables.
### Return Type
Recall that executing the `GetLibraryEntry` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLibraryEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLibraryEntryData {
  libraryEntry?: {
    status: string;
    progressCount: number;
  };
}
```
### Using `GetLibraryEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLibraryEntry } from '@dataconnect/generated';


// Call the `getLibraryEntry()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLibraryEntry();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLibraryEntry(dataConnect);

console.log(data.libraryEntry);

// Or, you can use the `Promise` API.
getLibraryEntry().then((response) => {
  const data = response.data;
  console.log(data.libraryEntry);
});
```

### Using `GetLibraryEntry`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLibraryEntryRef } from '@dataconnect/generated';


// Call the `getLibraryEntryRef()` function to get a reference to the query.
const ref = getLibraryEntryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLibraryEntryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.libraryEntry);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryEntry);
});
```

## ListLibraryEntries
You can execute the `ListLibraryEntries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listLibraryEntries(options?: ExecuteQueryOptions): QueryPromise<ListLibraryEntriesData, undefined>;

interface ListLibraryEntriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLibraryEntriesData, undefined>;
}
export const listLibraryEntriesRef: ListLibraryEntriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLibraryEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLibraryEntriesData, undefined>;

interface ListLibraryEntriesRef {
  ...
  (dc: DataConnect): QueryRef<ListLibraryEntriesData, undefined>;
}
export const listLibraryEntriesRef: ListLibraryEntriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLibraryEntriesRef:
```typescript
const name = listLibraryEntriesRef.operationName;
console.log(name);
```

### Variables
The `ListLibraryEntries` query has no variables.
### Return Type
Recall that executing the `ListLibraryEntries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLibraryEntriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListLibraryEntriesData {
  libraryEntries: ({
    status: string;
    title: {
      titleName: string;
    };
  })[];
}
```
### Using `ListLibraryEntries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLibraryEntries } from '@dataconnect/generated';


// Call the `listLibraryEntries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLibraryEntries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLibraryEntries(dataConnect);

console.log(data.libraryEntries);

// Or, you can use the `Promise` API.
listLibraryEntries().then((response) => {
  const data = response.data;
  console.log(data.libraryEntries);
});
```

### Using `ListLibraryEntries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLibraryEntriesRef } from '@dataconnect/generated';


// Call the `listLibraryEntriesRef()` function to get a reference to the query.
const ref = listLibraryEntriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLibraryEntriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.libraryEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryEntries);
});
```

## GetGenre
You can execute the `GetGenre` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGenre(options?: ExecuteQueryOptions): QueryPromise<GetGenreData, undefined>;

interface GetGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetGenreData, undefined>;
}
export const getGenreRef: GetGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGenre(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetGenreData, undefined>;

interface GetGenreRef {
  ...
  (dc: DataConnect): QueryRef<GetGenreData, undefined>;
}
export const getGenreRef: GetGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGenreRef:
```typescript
const name = getGenreRef.operationName;
console.log(name);
```

### Variables
The `GetGenre` query has no variables.
### Return Type
Recall that executing the `GetGenre` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGenreData {
  genre?: {
    genreName: string;
  };
}
```
### Using `GetGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGenre } from '@dataconnect/generated';


// Call the `getGenre()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGenre(dataConnect);

console.log(data.genre);

// Or, you can use the `Promise` API.
getGenre().then((response) => {
  const data = response.data;
  console.log(data.genre);
});
```

### Using `GetGenre`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGenreRef } from '@dataconnect/generated';


// Call the `getGenreRef()` function to get a reference to the query.
const ref = getGenreRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGenreRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.genre);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.genre);
});
```

## ListGenres
You can execute the `ListGenres` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGenres(options?: ExecuteQueryOptions): QueryPromise<ListGenresData, undefined>;

interface ListGenresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGenresData, undefined>;
}
export const listGenresRef: ListGenresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGenres(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGenresData, undefined>;

interface ListGenresRef {
  ...
  (dc: DataConnect): QueryRef<ListGenresData, undefined>;
}
export const listGenresRef: ListGenresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGenresRef:
```typescript
const name = listGenresRef.operationName;
console.log(name);
```

### Variables
The `ListGenres` query has no variables.
### Return Type
Recall that executing the `ListGenres` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGenresData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGenresData {
  genres: ({
    genreName: string;
  })[];
}
```
### Using `ListGenres`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGenres } from '@dataconnect/generated';


// Call the `listGenres()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGenres();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGenres(dataConnect);

console.log(data.genres);

// Or, you can use the `Promise` API.
listGenres().then((response) => {
  const data = response.data;
  console.log(data.genres);
});
```

### Using `ListGenres`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGenresRef } from '@dataconnect/generated';


// Call the `listGenresRef()` function to get a reference to the query.
const ref = listGenresRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGenresRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.genres);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.genres);
});
```

## ListTitleGenres
You can execute the `ListTitleGenres` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTitleGenres(options?: ExecuteQueryOptions): QueryPromise<ListTitleGenresData, undefined>;

interface ListTitleGenresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTitleGenresData, undefined>;
}
export const listTitleGenresRef: ListTitleGenresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTitleGenres(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTitleGenresData, undefined>;

interface ListTitleGenresRef {
  ...
  (dc: DataConnect): QueryRef<ListTitleGenresData, undefined>;
}
export const listTitleGenresRef: ListTitleGenresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTitleGenresRef:
```typescript
const name = listTitleGenresRef.operationName;
console.log(name);
```

### Variables
The `ListTitleGenres` query has no variables.
### Return Type
Recall that executing the `ListTitleGenres` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTitleGenresData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTitleGenresData {
  titleGenres: ({
    title: {
      titleName: string;
    };
    genre: {
      genreName: string;
    };
  })[];
}
```
### Using `ListTitleGenres`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTitleGenres } from '@dataconnect/generated';


// Call the `listTitleGenres()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTitleGenres();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTitleGenres(dataConnect);

console.log(data.titleGenres);

// Or, you can use the `Promise` API.
listTitleGenres().then((response) => {
  const data = response.data;
  console.log(data.titleGenres);
});
```

### Using `ListTitleGenres`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTitleGenresRef } from '@dataconnect/generated';


// Call the `listTitleGenresRef()` function to get a reference to the query.
const ref = listTitleGenresRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTitleGenresRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.titleGenres);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.titleGenres);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## InsertUser
You can execute the `InsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertUser(): MutationPromise<InsertUserData, undefined>;

interface InsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertUserData, undefined>;
}
export const insertUserRef: InsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertUser(dc: DataConnect): MutationPromise<InsertUserData, undefined>;

interface InsertUserRef {
  ...
  (dc: DataConnect): MutationRef<InsertUserData, undefined>;
}
export const insertUserRef: InsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertUserRef:
```typescript
const name = insertUserRef.operationName;
console.log(name);
```

### Variables
The `InsertUser` mutation has no variables.
### Return Type
Recall that executing the `InsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertUserData {
  user_insert: User_Key;
}
```
### Using `InsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertUser } from '@dataconnect/generated';


// Call the `insertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
insertUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `InsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertUserRef } from '@dataconnect/generated';


// Call the `insertUserRef()` function to get a reference to the mutation.
const ref = insertUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## InsertTitle
You can execute the `InsertTitle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertTitle(): MutationPromise<InsertTitleData, undefined>;

interface InsertTitleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertTitleData, undefined>;
}
export const insertTitleRef: InsertTitleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertTitle(dc: DataConnect): MutationPromise<InsertTitleData, undefined>;

interface InsertTitleRef {
  ...
  (dc: DataConnect): MutationRef<InsertTitleData, undefined>;
}
export const insertTitleRef: InsertTitleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertTitleRef:
```typescript
const name = insertTitleRef.operationName;
console.log(name);
```

### Variables
The `InsertTitle` mutation has no variables.
### Return Type
Recall that executing the `InsertTitle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertTitleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertTitleData {
  title_insert: Title_Key;
}
```
### Using `InsertTitle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertTitle } from '@dataconnect/generated';


// Call the `insertTitle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertTitle();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertTitle(dataConnect);

console.log(data.title_insert);

// Or, you can use the `Promise` API.
insertTitle().then((response) => {
  const data = response.data;
  console.log(data.title_insert);
});
```

### Using `InsertTitle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertTitleRef } from '@dataconnect/generated';


// Call the `insertTitleRef()` function to get a reference to the mutation.
const ref = insertTitleRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertTitleRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.title_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.title_insert);
});
```

## UpdateTitle
You can execute the `UpdateTitle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTitle(): MutationPromise<UpdateTitleData, undefined>;

interface UpdateTitleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTitleData, undefined>;
}
export const updateTitleRef: UpdateTitleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTitle(dc: DataConnect): MutationPromise<UpdateTitleData, undefined>;

interface UpdateTitleRef {
  ...
  (dc: DataConnect): MutationRef<UpdateTitleData, undefined>;
}
export const updateTitleRef: UpdateTitleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTitleRef:
```typescript
const name = updateTitleRef.operationName;
console.log(name);
```

### Variables
The `UpdateTitle` mutation has no variables.
### Return Type
Recall that executing the `UpdateTitle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTitleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTitleData {
  title_update?: Title_Key | null;
}
```
### Using `UpdateTitle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTitle } from '@dataconnect/generated';


// Call the `updateTitle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTitle();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTitle(dataConnect);

console.log(data.title_update);

// Or, you can use the `Promise` API.
updateTitle().then((response) => {
  const data = response.data;
  console.log(data.title_update);
});
```

### Using `UpdateTitle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTitleRef } from '@dataconnect/generated';


// Call the `updateTitleRef()` function to get a reference to the mutation.
const ref = updateTitleRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTitleRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.title_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.title_update);
});
```

## DeleteTitle
You can execute the `DeleteTitle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTitle(): MutationPromise<DeleteTitleData, undefined>;

interface DeleteTitleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTitleData, undefined>;
}
export const deleteTitleRef: DeleteTitleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTitle(dc: DataConnect): MutationPromise<DeleteTitleData, undefined>;

interface DeleteTitleRef {
  ...
  (dc: DataConnect): MutationRef<DeleteTitleData, undefined>;
}
export const deleteTitleRef: DeleteTitleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTitleRef:
```typescript
const name = deleteTitleRef.operationName;
console.log(name);
```

### Variables
The `DeleteTitle` mutation has no variables.
### Return Type
Recall that executing the `DeleteTitle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTitleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTitleData {
  title_delete?: Title_Key | null;
}
```
### Using `DeleteTitle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTitle } from '@dataconnect/generated';


// Call the `deleteTitle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTitle();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTitle(dataConnect);

console.log(data.title_delete);

// Or, you can use the `Promise` API.
deleteTitle().then((response) => {
  const data = response.data;
  console.log(data.title_delete);
});
```

### Using `DeleteTitle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTitleRef } from '@dataconnect/generated';


// Call the `deleteTitleRef()` function to get a reference to the mutation.
const ref = deleteTitleRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTitleRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.title_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.title_delete);
});
```

## InsertLibraryEntry
You can execute the `InsertLibraryEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertLibraryEntry(): MutationPromise<InsertLibraryEntryData, undefined>;

interface InsertLibraryEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertLibraryEntryData, undefined>;
}
export const insertLibraryEntryRef: InsertLibraryEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertLibraryEntry(dc: DataConnect): MutationPromise<InsertLibraryEntryData, undefined>;

interface InsertLibraryEntryRef {
  ...
  (dc: DataConnect): MutationRef<InsertLibraryEntryData, undefined>;
}
export const insertLibraryEntryRef: InsertLibraryEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertLibraryEntryRef:
```typescript
const name = insertLibraryEntryRef.operationName;
console.log(name);
```

### Variables
The `InsertLibraryEntry` mutation has no variables.
### Return Type
Recall that executing the `InsertLibraryEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertLibraryEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertLibraryEntryData {
  libraryEntry_insert: LibraryEntry_Key;
}
```
### Using `InsertLibraryEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertLibraryEntry } from '@dataconnect/generated';


// Call the `insertLibraryEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertLibraryEntry();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertLibraryEntry(dataConnect);

console.log(data.libraryEntry_insert);

// Or, you can use the `Promise` API.
insertLibraryEntry().then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_insert);
});
```

### Using `InsertLibraryEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertLibraryEntryRef } from '@dataconnect/generated';


// Call the `insertLibraryEntryRef()` function to get a reference to the mutation.
const ref = insertLibraryEntryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertLibraryEntryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.libraryEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_insert);
});
```

## UpdateLibraryEntry
You can execute the `UpdateLibraryEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLibraryEntry(): MutationPromise<UpdateLibraryEntryData, undefined>;

interface UpdateLibraryEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateLibraryEntryData, undefined>;
}
export const updateLibraryEntryRef: UpdateLibraryEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLibraryEntry(dc: DataConnect): MutationPromise<UpdateLibraryEntryData, undefined>;

interface UpdateLibraryEntryRef {
  ...
  (dc: DataConnect): MutationRef<UpdateLibraryEntryData, undefined>;
}
export const updateLibraryEntryRef: UpdateLibraryEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLibraryEntryRef:
```typescript
const name = updateLibraryEntryRef.operationName;
console.log(name);
```

### Variables
The `UpdateLibraryEntry` mutation has no variables.
### Return Type
Recall that executing the `UpdateLibraryEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLibraryEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLibraryEntryData {
  libraryEntry_update?: LibraryEntry_Key | null;
}
```
### Using `UpdateLibraryEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLibraryEntry } from '@dataconnect/generated';


// Call the `updateLibraryEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLibraryEntry();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLibraryEntry(dataConnect);

console.log(data.libraryEntry_update);

// Or, you can use the `Promise` API.
updateLibraryEntry().then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_update);
});
```

### Using `UpdateLibraryEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLibraryEntryRef } from '@dataconnect/generated';


// Call the `updateLibraryEntryRef()` function to get a reference to the mutation.
const ref = updateLibraryEntryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLibraryEntryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.libraryEntry_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_update);
});
```

## DeleteLibraryEntry
You can execute the `DeleteLibraryEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteLibraryEntry(): MutationPromise<DeleteLibraryEntryData, undefined>;

interface DeleteLibraryEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteLibraryEntryData, undefined>;
}
export const deleteLibraryEntryRef: DeleteLibraryEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLibraryEntry(dc: DataConnect): MutationPromise<DeleteLibraryEntryData, undefined>;

interface DeleteLibraryEntryRef {
  ...
  (dc: DataConnect): MutationRef<DeleteLibraryEntryData, undefined>;
}
export const deleteLibraryEntryRef: DeleteLibraryEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLibraryEntryRef:
```typescript
const name = deleteLibraryEntryRef.operationName;
console.log(name);
```

### Variables
The `DeleteLibraryEntry` mutation has no variables.
### Return Type
Recall that executing the `DeleteLibraryEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLibraryEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLibraryEntryData {
  libraryEntry_delete?: LibraryEntry_Key | null;
}
```
### Using `DeleteLibraryEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLibraryEntry } from '@dataconnect/generated';


// Call the `deleteLibraryEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLibraryEntry();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLibraryEntry(dataConnect);

console.log(data.libraryEntry_delete);

// Or, you can use the `Promise` API.
deleteLibraryEntry().then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_delete);
});
```

### Using `DeleteLibraryEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLibraryEntryRef } from '@dataconnect/generated';


// Call the `deleteLibraryEntryRef()` function to get a reference to the mutation.
const ref = deleteLibraryEntryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLibraryEntryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.libraryEntry_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryEntry_delete);
});
```

## InsertGenre
You can execute the `InsertGenre` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertGenre(): MutationPromise<InsertGenreData, undefined>;

interface InsertGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertGenreData, undefined>;
}
export const insertGenreRef: InsertGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertGenre(dc: DataConnect): MutationPromise<InsertGenreData, undefined>;

interface InsertGenreRef {
  ...
  (dc: DataConnect): MutationRef<InsertGenreData, undefined>;
}
export const insertGenreRef: InsertGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertGenreRef:
```typescript
const name = insertGenreRef.operationName;
console.log(name);
```

### Variables
The `InsertGenre` mutation has no variables.
### Return Type
Recall that executing the `InsertGenre` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertGenreData {
  genre_insert: Genre_Key;
}
```
### Using `InsertGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertGenre } from '@dataconnect/generated';


// Call the `insertGenre()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertGenre(dataConnect);

console.log(data.genre_insert);

// Or, you can use the `Promise` API.
insertGenre().then((response) => {
  const data = response.data;
  console.log(data.genre_insert);
});
```

### Using `InsertGenre`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertGenreRef } from '@dataconnect/generated';


// Call the `insertGenreRef()` function to get a reference to the mutation.
const ref = insertGenreRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertGenreRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.genre_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.genre_insert);
});
```

## UpdateGenre
You can execute the `UpdateGenre` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGenre(): MutationPromise<UpdateGenreData, undefined>;

interface UpdateGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateGenreData, undefined>;
}
export const updateGenreRef: UpdateGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGenre(dc: DataConnect): MutationPromise<UpdateGenreData, undefined>;

interface UpdateGenreRef {
  ...
  (dc: DataConnect): MutationRef<UpdateGenreData, undefined>;
}
export const updateGenreRef: UpdateGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGenreRef:
```typescript
const name = updateGenreRef.operationName;
console.log(name);
```

### Variables
The `UpdateGenre` mutation has no variables.
### Return Type
Recall that executing the `UpdateGenre` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGenreData {
  genre_update?: Genre_Key | null;
}
```
### Using `UpdateGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGenre } from '@dataconnect/generated';


// Call the `updateGenre()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGenre(dataConnect);

console.log(data.genre_update);

// Or, you can use the `Promise` API.
updateGenre().then((response) => {
  const data = response.data;
  console.log(data.genre_update);
});
```

### Using `UpdateGenre`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGenreRef } from '@dataconnect/generated';


// Call the `updateGenreRef()` function to get a reference to the mutation.
const ref = updateGenreRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGenreRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.genre_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.genre_update);
});
```

## DeleteGenre
You can execute the `DeleteGenre` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteGenre(): MutationPromise<DeleteGenreData, undefined>;

interface DeleteGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteGenreData, undefined>;
}
export const deleteGenreRef: DeleteGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGenre(dc: DataConnect): MutationPromise<DeleteGenreData, undefined>;

interface DeleteGenreRef {
  ...
  (dc: DataConnect): MutationRef<DeleteGenreData, undefined>;
}
export const deleteGenreRef: DeleteGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGenreRef:
```typescript
const name = deleteGenreRef.operationName;
console.log(name);
```

### Variables
The `DeleteGenre` mutation has no variables.
### Return Type
Recall that executing the `DeleteGenre` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGenreData {
  genre_delete?: Genre_Key | null;
}
```
### Using `DeleteGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGenre } from '@dataconnect/generated';


// Call the `deleteGenre()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGenre(dataConnect);

console.log(data.genre_delete);

// Or, you can use the `Promise` API.
deleteGenre().then((response) => {
  const data = response.data;
  console.log(data.genre_delete);
});
```

### Using `DeleteGenre`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGenreRef } from '@dataconnect/generated';


// Call the `deleteGenreRef()` function to get a reference to the mutation.
const ref = deleteGenreRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGenreRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.genre_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.genre_delete);
});
```

## InsertTitleGenre
You can execute the `InsertTitleGenre` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertTitleGenre(): MutationPromise<InsertTitleGenreData, undefined>;

interface InsertTitleGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertTitleGenreData, undefined>;
}
export const insertTitleGenreRef: InsertTitleGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertTitleGenre(dc: DataConnect): MutationPromise<InsertTitleGenreData, undefined>;

interface InsertTitleGenreRef {
  ...
  (dc: DataConnect): MutationRef<InsertTitleGenreData, undefined>;
}
export const insertTitleGenreRef: InsertTitleGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertTitleGenreRef:
```typescript
const name = insertTitleGenreRef.operationName;
console.log(name);
```

### Variables
The `InsertTitleGenre` mutation has no variables.
### Return Type
Recall that executing the `InsertTitleGenre` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertTitleGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertTitleGenreData {
  titleGenre_insert: TitleGenre_Key;
}
```
### Using `InsertTitleGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertTitleGenre } from '@dataconnect/generated';


// Call the `insertTitleGenre()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertTitleGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertTitleGenre(dataConnect);

console.log(data.titleGenre_insert);

// Or, you can use the `Promise` API.
insertTitleGenre().then((response) => {
  const data = response.data;
  console.log(data.titleGenre_insert);
});
```

### Using `InsertTitleGenre`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertTitleGenreRef } from '@dataconnect/generated';


// Call the `insertTitleGenreRef()` function to get a reference to the mutation.
const ref = insertTitleGenreRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertTitleGenreRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.titleGenre_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.titleGenre_insert);
});
```

## DeleteTitleGenre
You can execute the `DeleteTitleGenre` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTitleGenre(): MutationPromise<DeleteTitleGenreData, undefined>;

interface DeleteTitleGenreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTitleGenreData, undefined>;
}
export const deleteTitleGenreRef: DeleteTitleGenreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTitleGenre(dc: DataConnect): MutationPromise<DeleteTitleGenreData, undefined>;

interface DeleteTitleGenreRef {
  ...
  (dc: DataConnect): MutationRef<DeleteTitleGenreData, undefined>;
}
export const deleteTitleGenreRef: DeleteTitleGenreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTitleGenreRef:
```typescript
const name = deleteTitleGenreRef.operationName;
console.log(name);
```

### Variables
The `DeleteTitleGenre` mutation has no variables.
### Return Type
Recall that executing the `DeleteTitleGenre` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTitleGenreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTitleGenreData {
  titleGenre_delete?: TitleGenre_Key | null;
}
```
### Using `DeleteTitleGenre`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTitleGenre } from '@dataconnect/generated';


// Call the `deleteTitleGenre()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTitleGenre();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTitleGenre(dataConnect);

console.log(data.titleGenre_delete);

// Or, you can use the `Promise` API.
deleteTitleGenre().then((response) => {
  const data = response.data;
  console.log(data.titleGenre_delete);
});
```

### Using `DeleteTitleGenre`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTitleGenreRef } from '@dataconnect/generated';


// Call the `deleteTitleGenreRef()` function to get a reference to the mutation.
const ref = deleteTitleGenreRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTitleGenreRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.titleGenre_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.titleGenre_delete);
});
```

