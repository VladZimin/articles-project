import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getArticlesOrder,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
    getArticlesView,
} from '../../model/selectors/articles';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';

export const useArticlesFilters = () => {
    const view = useSelector(getArticlesView);
    const sort = useSelector(getArticlesSort);
    const order = useSelector(getArticlesOrder);
    const search = useSelector(getArticlesSearch);
    const type = useSelector(getArticlesType);
    const dispatch = useAppDispatch();

    const fetchDataWithFilters = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);
    const fetchDebouncedData = useDebounce(fetchDataWithFilters, 500);
    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(articlesPageActions.setView(newView));
    }, [dispatch]);
    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchDataWithFilters();
    }, [dispatch, fetchDataWithFilters]);
    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchDataWithFilters();
    }, [dispatch, fetchDataWithFilters]);
    const onChangeSearch = useCallback((newValue: string) => {
        dispatch(articlesPageActions.setSearch(newValue));
        dispatch(articlesPageActions.setPage(1));
        fetchDebouncedData();
    }, [dispatch, fetchDebouncedData]);
    const onChangeTab = useCallback((tabValue: ArticleType) => {
        dispatch(articlesPageActions.setType(tabValue));
        dispatch(articlesPageActions.setPage(1));
        fetchDataWithFilters();
    }, [dispatch, fetchDataWithFilters]);

    return {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeTab,
        onChangeView,
        view,
        sort,
        order,
        search,
        type,
    };
};
