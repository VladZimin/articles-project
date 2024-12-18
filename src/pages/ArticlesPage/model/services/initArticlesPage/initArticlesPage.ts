import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/model/const/articleConst';
import { getArticlesInited } from '../../selectors/articles';
import { fetchArticles } from '../fetchArticles/fetchArticles';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const inited = getArticlesInited(getState());

        if (!inited) {
            const sortUrl = searchParams.get('sort') as ArticleSortField;
            const orderUrl = searchParams.get('order') as SortOrder;
            const typeUrl = searchParams.get('type') as ArticleType;
            const searchUrl = searchParams.get('search');
            if (searchUrl) {
                dispatch(articlesPageActions.setSearch(searchUrl));
            }
            if (orderUrl) {
                dispatch(articlesPageActions.setOrder(orderUrl));
            }
            if (sortUrl) {
                dispatch(articlesPageActions.setSort(sortUrl));
            }
            if (typeUrl) {
                dispatch(articlesPageActions.setType(typeUrl));
            }
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticles({
                replace: false,
            }));
        }
    },
);
