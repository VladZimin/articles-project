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
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from './ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from './FiltersContainer/FiltersContainer';

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

    const content = (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <StickyContentLayout
                    content={(
                        <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
                            <ArticleInfiniteList />
                            <ArticlePageGreeting />
                        </Page>
                    )}
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                />

            )}
            off={(
                <Page onScrollEnd={onLoadNextPart} className={classNames('', {}, [className])}>
                    <ArticlesPageFilters />
                    <ArticleInfiniteList />
                    <ArticlePageGreeting />
                </Page>
            )}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {content}
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
