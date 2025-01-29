import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '../../../../../entities/Comment';

export const fetchCommentsById = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetailsPage/getCommentById',
    async (articleId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        if (!articleId) {
            return rejectWithValue('Error');
        }
        try {
            const res = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId,
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
