import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import { useCallback } from 'react';
import { fetchArticlesNextPage } from '../model/services/fetchArticlesNextPage/fetchArticlesNextPage';
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles';
import { getArticlesIsLoading, getArticlesView } from '../model/selectors/articles/articles';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
    articles: articlesPageReducer,
};
const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(articlesPageActions.initView());
        dispatch(fetchArticles({
            page: 1,
        }));
    });

    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(articlesPageActions.setView(newView));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNextPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector onChangeView={onChangeView} view={view} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
