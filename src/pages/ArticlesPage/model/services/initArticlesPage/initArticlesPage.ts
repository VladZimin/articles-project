import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { fetchArticles } from 'pages/ArticlesPage/model/services/fetchArticles/fetchArticles';
import { getArticlesInited } from 'pages/ArticlesPage/model/selectors/articles/articles';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const inited = getArticlesInited(getState());

        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticles({
                page: 1,
            }));
        }
    },
);
