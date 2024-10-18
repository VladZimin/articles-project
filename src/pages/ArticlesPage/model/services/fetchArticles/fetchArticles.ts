import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesLimit,
    getArticlesOrder,
    getArticlesPage,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
} from 'pages/ArticlesPage/model/selectors/articles';
import { addSearchParams } from 'shared/lib/url/addSearchParams/addSearchParams';
import { Article, ArticleType } from '../../../../../entities/Article';

interface FetchArticlesArgs {
  replace?: boolean;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs, ThunkConfig<string>>(
    'articlesPage/fetchArticles',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const sort = getArticlesSort(getState());
        const order = getArticlesOrder(getState());
        const search = getArticlesSearch(getState());
        const page = getArticlesPage(getState());
        const limit = getArticlesLimit(getState());
        const type = getArticlesType(getState());

        try {
            addSearchParams({
                sort,
                order,
                search,
                type,
            });
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _order: order,
                    _sort: sort,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
