import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { TextSize } from 'shared/ui/Text/Text';
import { HTMLAttributeAnchorTarget } from 'react';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
    className?: string
    view?: ArticleView
    articles?: Article[]
    isLoading?: boolean
    target?: HTMLAttributeAnchorTarget
}

const getSkeleton = (view: ArticleView) => (
    new Array(view === ArticleView.SMALL ? 9 : 3).fill(0)
        .map((_, i) => <ArticleListItemSkeleton key={i} view={view} />)
);

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        view = ArticleView.SMALL,
        articles,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem
            key={article.id}
            article={article}
            view={view}
            target={target}
        />
    );
    if (!isLoading && !articles?.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} text={t('Статьи не найдены')} />
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles?.map(renderArticle)}
            {isLoading && (
                <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    {getSkeleton(view)}
                </div>
            )}
        </div>
    );
};
