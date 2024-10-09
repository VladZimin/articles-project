import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesIsLoading = (state: StateSchema) => state.articles?.isLoading;
export const getArticlesError = (state: StateSchema) => state.articles?.error;
export const getArticlesView = (state: StateSchema) => state.articles?.view;
