import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { getArticles } from '../../model/slice/articlesPageSlice';
import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = ({ className }:ArticleInfiniteListProps) => {
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const articles = useSelector(getArticles.selectAll);

    return (
        <ArticleList
            className={classNames('', {}, [className])}
            articles={articles}
            isLoading={isLoading}
            view={view}
        />
    );
};
