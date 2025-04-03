import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { Input } from '@/shared/ui/deprecated/Input';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
    getArticlesOrder,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
    getArticlesView,
} from '../../model/selectors/articles';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';
import { ArticleSortSelectors } from '@/features/ArticleSortSelectors';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
    const { t } = useTranslation();
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
    return (
        <div className={classNames('', {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelectors
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <ArticleViewSelector onChangeView={onChangeView} view={view} />
            </div>
            <Card className={cls.search}>
                <Input placeholder={t('Поиск')} onChange={onChangeSearch} value={search} />
            </Card>
            <ArticleTypeTabs
                className={cls.tabs}
                tabValue={type}
                onChangeTab={onChangeTab}
            />
        </div>
    );
};
