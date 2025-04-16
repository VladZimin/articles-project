import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
    className?: string
}

export const FiltersContainer = ({ className }:FiltersContainerProps) => {
    const {
        sort,
        order,
        type,
        search,
        onChangeSort,
        onChangeSearch,
        onChangeTab,
        onChangeOrder,
    } = useArticlesFilters();

    return (
        <ArticlesFilters
            className={className}
            order={order}
            tabValue={type}
            sort={sort}
            search={search}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeTab={onChangeTab}
            onChangeOrder={onChangeOrder}
        />
    );
};
