import { useTranslation } from 'react-i18next';
import {
    Card, VStack, Input, Icon,
} from '@/shared/ui/redesigned';
import { ArticleSortSelectors } from '@/features/ArticleSortSelectors';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import cls from './ArticlesFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/search.svg';

interface ArticlesFiltersProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeSort: (sort: ArticleSortField) => void
  onChangeOrder: (order: SortOrder) => void
  onChangeSearch: (value: string) => void
  tabValue: ArticleType
  onChangeTab: (tabValue: ArticleType) => void
  search: string
}

export const ArticlesFilters = ({
    className, tabValue, onChangeTab, onChangeSearch, search, onChangeSort, onChangeOrder, sort, order,
}:ArticlesFiltersProps) => {
    const { t } = useTranslation();

    return (
        <Card className={classNames(cls.ArticlesFilters, {}, [className])} padding="24">
            <VStack gap="32">
                <Input
                    placeholder={t('Поиск')}
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <ArticleTypeTabs
                    tabValue={tabValue}
                    onChangeTab={onChangeTab}
                />
                <ArticleSortSelectors
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
            </VStack>
        </Card>
    );
};
