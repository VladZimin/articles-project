import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { Input } from '@/shared/ui/deprecated/Input';

import cls from './ArticlesPageFilters.module.scss';
import { ArticleSortSelectors } from '@/features/ArticleSortSelectors';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
    const { t } = useTranslation();

    const {
        sort,
        order,
        type,
        view,
        search,
        onChangeSort,
        onChangeSearch,
        onChangeTab,
        onChangeOrder,
        onChangeView,
    } = useArticlesFilters();

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
