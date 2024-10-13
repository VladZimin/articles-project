import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesLimit } from 'pages/ArticlesPage/model/selectors/articles/articles';
import { Article } from '../../../../../entities/Article';

interface FetchArticlesArgs {
  page?: number;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs, ThunkConfig<string>>(
    'articlesPage/fetchArticles',
    async (args, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const { page } = args;
        const limit = getArticlesLimit(getState());

        try {
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                },
            });
            if (!res.data) {
                throw new Error();
            }
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
