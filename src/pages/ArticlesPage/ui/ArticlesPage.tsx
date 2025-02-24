import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { ArticleInfiniteList } from './ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from './ArticlesPageFilters/ArticlesPageFilters';
import { fetchArticlesNextPage } from '../model/services/fetchArticlesNextPage/fetchArticlesNextPage';
import { articlesPageReducer } from '../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
    articles: articlesPageReducer,
};
const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticlesPageFilters />
                <ArticleInfiniteList />
                <ArticlePageGreeting />
            </Page>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
