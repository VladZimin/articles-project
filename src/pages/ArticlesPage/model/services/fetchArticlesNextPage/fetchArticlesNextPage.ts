import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesHasMore,
    getArticlesIsLoading,
    getArticlesPage,
} from 'pages/ArticlesPage/model/selectors/articles/articles';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { fetchArticles } from 'pages/ArticlesPage/model/services/fetchArticles/fetchArticles';

export const fetchArticlesNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchArticlesNextPage',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const page = getArticlesPage(getState());
        const hasMore = getArticlesHasMore(getState());
        const isLoading = getArticlesIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticles({
                page: page + 1,
            }));
        }
    },
);
