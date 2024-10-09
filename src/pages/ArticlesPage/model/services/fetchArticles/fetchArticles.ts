import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../../../../entities/Article';

export const fetchArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesPage/fetchArticles',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        try {
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
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
