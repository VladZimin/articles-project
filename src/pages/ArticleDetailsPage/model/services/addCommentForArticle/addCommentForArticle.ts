import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchCommentsById } from '../fetchCommentsById/fetchCommentsById';
import { getUserAuthData } from '../../../../../entities/User';
import { Comment } from '../../../../../entities/Comment';
import { getArticleDetailsData } from '../../../../../entities/Article';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'article/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            dispatch, rejectWithValue, extra, getState,
        } = thunkAPI;

        const user = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!user || !article) {
            return rejectWithValue('No data!');
        }

        try {
            const res = await extra.api.post<Comment>('/comments', {
                text,
                articleId: article.id,
                userId: user.id,
            });
            if (!res.data) {
                throw new Error();
            }
            dispatch(fetchCommentsById(article.id));
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
