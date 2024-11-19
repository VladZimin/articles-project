import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesHasMore, getArticlesIsLoading, getArticlesPage } from '../../selectors/articles';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchArticlesNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchArticlesNextPage',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const page = getArticlesPage(getState());
        const hasMore = getArticlesHasMore(getState());
        const isLoading = getArticlesIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticles({ replace: false }));
        }
    },
);
