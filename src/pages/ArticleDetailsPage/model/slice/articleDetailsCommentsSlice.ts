import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsById } from 'pages/ArticleDetailsPage/model/services/fetchCommentsById/fetchCommentsById';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { Comment } from '../../../../entities/Comment';

const commentsAdapter = createEntityAdapter({
    selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => (
        state.articleDetailsPage?.articleDetailsComments || commentsAdapter.getInitialState()
    ),
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentsById.fulfilled, (state, action) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsCommentsReducer,
    actions: articleDetailsCommentsActions,
} = articleDetailsCommentsSlice;
