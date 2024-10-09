import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles';
import { getArticlesError, getArticlesIsLoading, getArticlesView } from '../model/selectors/articles/articles';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
    articles: articlesPageReducer,
};
const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlesPageActions.initView());
    });

    const onChangeView = (newView: ArticleView) => {
        dispatch(articlesPageActions.setView(newView));
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector onChangeView={onChangeView} view={view} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
