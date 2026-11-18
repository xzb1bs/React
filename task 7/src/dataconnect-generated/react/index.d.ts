import { InsertUserData, UpdateUserData, DeleteUserData, GetUserData, ListUsersData, InsertTitleData, UpdateTitleData, DeleteTitleData, GetTitleData, ListTitlesData, InsertLibraryEntryData, UpdateLibraryEntryData, DeleteLibraryEntryData, GetLibraryEntryData, ListLibraryEntriesData, InsertGenreData, UpdateGenreData, DeleteGenreData, GetGenreData, ListGenresData, InsertTitleGenreData, DeleteTitleGenreData, ListTitleGenresData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useInsertUser(options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, void>): UseDataConnectMutationResult<InsertUserData, undefined>;
export function useInsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, void>): UseDataConnectMutationResult<InsertUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useInsertTitle(options?: useDataConnectMutationOptions<InsertTitleData, FirebaseError, void>): UseDataConnectMutationResult<InsertTitleData, undefined>;
export function useInsertTitle(dc: DataConnect, options?: useDataConnectMutationOptions<InsertTitleData, FirebaseError, void>): UseDataConnectMutationResult<InsertTitleData, undefined>;

export function useUpdateTitle(options?: useDataConnectMutationOptions<UpdateTitleData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTitleData, undefined>;
export function useUpdateTitle(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTitleData, FirebaseError, void>): UseDataConnectMutationResult<UpdateTitleData, undefined>;

export function useDeleteTitle(options?: useDataConnectMutationOptions<DeleteTitleData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTitleData, undefined>;
export function useDeleteTitle(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTitleData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTitleData, undefined>;

export function useGetTitle(options?: useDataConnectQueryOptions<GetTitleData>): UseDataConnectQueryResult<GetTitleData, undefined>;
export function useGetTitle(dc: DataConnect, options?: useDataConnectQueryOptions<GetTitleData>): UseDataConnectQueryResult<GetTitleData, undefined>;

export function useListTitles(options?: useDataConnectQueryOptions<ListTitlesData>): UseDataConnectQueryResult<ListTitlesData, undefined>;
export function useListTitles(dc: DataConnect, options?: useDataConnectQueryOptions<ListTitlesData>): UseDataConnectQueryResult<ListTitlesData, undefined>;

export function useInsertLibraryEntry(options?: useDataConnectMutationOptions<InsertLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<InsertLibraryEntryData, undefined>;
export function useInsertLibraryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<InsertLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<InsertLibraryEntryData, undefined>;

export function useUpdateLibraryEntry(options?: useDataConnectMutationOptions<UpdateLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateLibraryEntryData, undefined>;
export function useUpdateLibraryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateLibraryEntryData, undefined>;

export function useDeleteLibraryEntry(options?: useDataConnectMutationOptions<DeleteLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteLibraryEntryData, undefined>;
export function useDeleteLibraryEntry(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLibraryEntryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteLibraryEntryData, undefined>;

export function useGetLibraryEntry(options?: useDataConnectQueryOptions<GetLibraryEntryData>): UseDataConnectQueryResult<GetLibraryEntryData, undefined>;
export function useGetLibraryEntry(dc: DataConnect, options?: useDataConnectQueryOptions<GetLibraryEntryData>): UseDataConnectQueryResult<GetLibraryEntryData, undefined>;

export function useListLibraryEntries(options?: useDataConnectQueryOptions<ListLibraryEntriesData>): UseDataConnectQueryResult<ListLibraryEntriesData, undefined>;
export function useListLibraryEntries(dc: DataConnect, options?: useDataConnectQueryOptions<ListLibraryEntriesData>): UseDataConnectQueryResult<ListLibraryEntriesData, undefined>;

export function useInsertGenre(options?: useDataConnectMutationOptions<InsertGenreData, FirebaseError, void>): UseDataConnectMutationResult<InsertGenreData, undefined>;
export function useInsertGenre(dc: DataConnect, options?: useDataConnectMutationOptions<InsertGenreData, FirebaseError, void>): UseDataConnectMutationResult<InsertGenreData, undefined>;

export function useUpdateGenre(options?: useDataConnectMutationOptions<UpdateGenreData, FirebaseError, void>): UseDataConnectMutationResult<UpdateGenreData, undefined>;
export function useUpdateGenre(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGenreData, FirebaseError, void>): UseDataConnectMutationResult<UpdateGenreData, undefined>;

export function useDeleteGenre(options?: useDataConnectMutationOptions<DeleteGenreData, FirebaseError, void>): UseDataConnectMutationResult<DeleteGenreData, undefined>;
export function useDeleteGenre(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteGenreData, FirebaseError, void>): UseDataConnectMutationResult<DeleteGenreData, undefined>;

export function useGetGenre(options?: useDataConnectQueryOptions<GetGenreData>): UseDataConnectQueryResult<GetGenreData, undefined>;
export function useGetGenre(dc: DataConnect, options?: useDataConnectQueryOptions<GetGenreData>): UseDataConnectQueryResult<GetGenreData, undefined>;

export function useListGenres(options?: useDataConnectQueryOptions<ListGenresData>): UseDataConnectQueryResult<ListGenresData, undefined>;
export function useListGenres(dc: DataConnect, options?: useDataConnectQueryOptions<ListGenresData>): UseDataConnectQueryResult<ListGenresData, undefined>;

export function useInsertTitleGenre(options?: useDataConnectMutationOptions<InsertTitleGenreData, FirebaseError, void>): UseDataConnectMutationResult<InsertTitleGenreData, undefined>;
export function useInsertTitleGenre(dc: DataConnect, options?: useDataConnectMutationOptions<InsertTitleGenreData, FirebaseError, void>): UseDataConnectMutationResult<InsertTitleGenreData, undefined>;

export function useDeleteTitleGenre(options?: useDataConnectMutationOptions<DeleteTitleGenreData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTitleGenreData, undefined>;
export function useDeleteTitleGenre(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTitleGenreData, FirebaseError, void>): UseDataConnectMutationResult<DeleteTitleGenreData, undefined>;

export function useListTitleGenres(options?: useDataConnectQueryOptions<ListTitleGenresData>): UseDataConnectQueryResult<ListTitleGenresData, undefined>;
export function useListTitleGenres(dc: DataConnect, options?: useDataConnectQueryOptions<ListTitleGenresData>): UseDataConnectQueryResult<ListTitleGenresData, undefined>;
