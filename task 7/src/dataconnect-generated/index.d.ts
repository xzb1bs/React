import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface DeleteGenreData {
  genre_delete?: Genre_Key | null;
}

export interface DeleteLibraryEntryData {
  libraryEntry_delete?: LibraryEntry_Key | null;
}

export interface DeleteTitleData {
  title_delete?: Title_Key | null;
}

export interface DeleteTitleGenreData {
  titleGenre_delete?: TitleGenre_Key | null;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Genre_Key {
  id: UUIDString;
  __typename?: 'Genre_Key';
}

export interface GetGenreData {
  genre?: {
    genreName: string;
  };
}

export interface GetLibraryEntryData {
  libraryEntry?: {
    status: string;
    progressCount: number;
  };
}

export interface GetTitleData {
  title?: {
    titleName: string;
    description?: string | null;
  };
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
    bio?: string | null;
  };
}

export interface InsertGenreData {
  genre_insert: Genre_Key;
}

export interface InsertLibraryEntryData {
  libraryEntry_insert: LibraryEntry_Key;
}

export interface InsertTitleData {
  title_insert: Title_Key;
}

export interface InsertTitleGenreData {
  titleGenre_insert: TitleGenre_Key;
}

export interface InsertUserData {
  user_insert: User_Key;
}

export interface LibraryEntry_Key {
  id: UUIDString;
  __typename?: 'LibraryEntry_Key';
}

export interface ListGenresData {
  genres: ({
    genreName: string;
  })[];
}

export interface ListLibraryEntriesData {
  libraryEntries: ({
    status: string;
    title: {
      titleName: string;
    };
  })[];
}

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

export interface ListTitlesData {
  titles: ({
    titleName: string;
    releaseYear?: number | null;
  })[];
}

export interface ListUsersData {
  users: ({
    username: string;
    avatarUrl?: string | null;
  })[];
}

export interface TitleGenre_Key {
  titleId: UUIDString;
  genreId: UUIDString;
  __typename?: 'TitleGenre_Key';
}

export interface Title_Key {
  id: UUIDString;
  __typename?: 'Title_Key';
}

export interface UpdateGenreData {
  genre_update?: Genre_Key | null;
}

export interface UpdateLibraryEntryData {
  libraryEntry_update?: LibraryEntry_Key | null;
}

export interface UpdateTitleData {
  title_update?: Title_Key | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface InsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertUserData, undefined>;
  operationName: string;
}
export const insertUserRef: InsertUserRef;

export function insertUser(): MutationPromise<InsertUserData, undefined>;
export function insertUser(dc: DataConnect): MutationPromise<InsertUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface InsertTitleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertTitleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertTitleData, undefined>;
  operationName: string;
}
export const insertTitleRef: InsertTitleRef;

export function insertTitle(): MutationPromise<InsertTitleData, undefined>;
export function insertTitle(dc: DataConnect): MutationPromise<InsertTitleData, undefined>;

interface UpdateTitleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateTitleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateTitleData, undefined>;
  operationName: string;
}
export const updateTitleRef: UpdateTitleRef;

export function updateTitle(): MutationPromise<UpdateTitleData, undefined>;
export function updateTitle(dc: DataConnect): MutationPromise<UpdateTitleData, undefined>;

interface DeleteTitleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTitleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteTitleData, undefined>;
  operationName: string;
}
export const deleteTitleRef: DeleteTitleRef;

export function deleteTitle(): MutationPromise<DeleteTitleData, undefined>;
export function deleteTitle(dc: DataConnect): MutationPromise<DeleteTitleData, undefined>;

interface GetTitleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTitleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTitleData, undefined>;
  operationName: string;
}
export const getTitleRef: GetTitleRef;

export function getTitle(options?: ExecuteQueryOptions): QueryPromise<GetTitleData, undefined>;
export function getTitle(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTitleData, undefined>;

interface ListTitlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTitlesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTitlesData, undefined>;
  operationName: string;
}
export const listTitlesRef: ListTitlesRef;

export function listTitles(options?: ExecuteQueryOptions): QueryPromise<ListTitlesData, undefined>;
export function listTitles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTitlesData, undefined>;

interface InsertLibraryEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertLibraryEntryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertLibraryEntryData, undefined>;
  operationName: string;
}
export const insertLibraryEntryRef: InsertLibraryEntryRef;

export function insertLibraryEntry(): MutationPromise<InsertLibraryEntryData, undefined>;
export function insertLibraryEntry(dc: DataConnect): MutationPromise<InsertLibraryEntryData, undefined>;

interface UpdateLibraryEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateLibraryEntryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateLibraryEntryData, undefined>;
  operationName: string;
}
export const updateLibraryEntryRef: UpdateLibraryEntryRef;

export function updateLibraryEntry(): MutationPromise<UpdateLibraryEntryData, undefined>;
export function updateLibraryEntry(dc: DataConnect): MutationPromise<UpdateLibraryEntryData, undefined>;

interface DeleteLibraryEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteLibraryEntryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteLibraryEntryData, undefined>;
  operationName: string;
}
export const deleteLibraryEntryRef: DeleteLibraryEntryRef;

export function deleteLibraryEntry(): MutationPromise<DeleteLibraryEntryData, undefined>;
export function deleteLibraryEntry(dc: DataConnect): MutationPromise<DeleteLibraryEntryData, undefined>;

interface GetLibraryEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLibraryEntryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLibraryEntryData, undefined>;
  operationName: string;
}
export const getLibraryEntryRef: GetLibraryEntryRef;

export function getLibraryEntry(options?: ExecuteQueryOptions): QueryPromise<GetLibraryEntryData, undefined>;
export function getLibraryEntry(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetLibraryEntryData, undefined>;

interface ListLibraryEntriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLibraryEntriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLibraryEntriesData, undefined>;
  operationName: string;
}
export const listLibraryEntriesRef: ListLibraryEntriesRef;

export function listLibraryEntries(options?: ExecuteQueryOptions): QueryPromise<ListLibraryEntriesData, undefined>;
export function listLibraryEntries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLibraryEntriesData, undefined>;

interface InsertGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertGenreData, undefined>;
  operationName: string;
}
export const insertGenreRef: InsertGenreRef;

export function insertGenre(): MutationPromise<InsertGenreData, undefined>;
export function insertGenre(dc: DataConnect): MutationPromise<InsertGenreData, undefined>;

interface UpdateGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateGenreData, undefined>;
  operationName: string;
}
export const updateGenreRef: UpdateGenreRef;

export function updateGenre(): MutationPromise<UpdateGenreData, undefined>;
export function updateGenre(dc: DataConnect): MutationPromise<UpdateGenreData, undefined>;

interface DeleteGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteGenreData, undefined>;
  operationName: string;
}
export const deleteGenreRef: DeleteGenreRef;

export function deleteGenre(): MutationPromise<DeleteGenreData, undefined>;
export function deleteGenre(dc: DataConnect): MutationPromise<DeleteGenreData, undefined>;

interface GetGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetGenreData, undefined>;
  operationName: string;
}
export const getGenreRef: GetGenreRef;

export function getGenre(options?: ExecuteQueryOptions): QueryPromise<GetGenreData, undefined>;
export function getGenre(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetGenreData, undefined>;

interface ListGenresRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGenresData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGenresData, undefined>;
  operationName: string;
}
export const listGenresRef: ListGenresRef;

export function listGenres(options?: ExecuteQueryOptions): QueryPromise<ListGenresData, undefined>;
export function listGenres(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGenresData, undefined>;

interface InsertTitleGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertTitleGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertTitleGenreData, undefined>;
  operationName: string;
}
export const insertTitleGenreRef: InsertTitleGenreRef;

export function insertTitleGenre(): MutationPromise<InsertTitleGenreData, undefined>;
export function insertTitleGenre(dc: DataConnect): MutationPromise<InsertTitleGenreData, undefined>;

interface DeleteTitleGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteTitleGenreData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteTitleGenreData, undefined>;
  operationName: string;
}
export const deleteTitleGenreRef: DeleteTitleGenreRef;

export function deleteTitleGenre(): MutationPromise<DeleteTitleGenreData, undefined>;
export function deleteTitleGenre(dc: DataConnect): MutationPromise<DeleteTitleGenreData, undefined>;

interface ListTitleGenresRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTitleGenresData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTitleGenresData, undefined>;
  operationName: string;
}
export const listTitleGenresRef: ListTitleGenresRef;

export function listTitleGenres(options?: ExecuteQueryOptions): QueryPromise<ListTitleGenresData, undefined>;
export function listTitleGenres(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTitleGenresData, undefined>;

