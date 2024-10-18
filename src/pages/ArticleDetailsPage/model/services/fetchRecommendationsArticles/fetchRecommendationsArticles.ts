import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../../../../entities/Article';

export const fetchRecommendationsArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesPage/fetchRecommendationsArticles',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const res = await extra.api.get<Article[]>('/articles', { params: { _limit: 4 } });
            if (!res.data) {
                throw new Error();
            }
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
