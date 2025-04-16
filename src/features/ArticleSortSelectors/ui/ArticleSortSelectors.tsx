import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelectors.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text, VStack } from '@/shared/ui/redesigned';

interface ArticleSortSelectorsProps {
    className?: string
    sort: ArticleSortField
    order: SortOrder
    onChangeSort: (sort: ArticleSortField) => void
    onChangeOrder: (order: SortOrder) => void
}

export const ArticleSortSelectors = (props: ArticleSortSelectorsProps) => {
    const {
        className,
        sort,
        order,
        onChangeSort,
        onChangeOrder,
    } = props;
    const { t } = useTranslation();

    const sortOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('времени'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам'),
        },
    ], [t]);
    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <div className={classNames('', {}, [className])}>
                    <VStack gap="8">
                        <Text text={t('Сортировать по:')} />
                        <ListBox
                            value={sort}
                            onChange={onChangeSort}
                            items={sortOptions}
                        />
                        <ListBox
                            value={order}
                            onChange={onChangeOrder}
                            items={orderOptions}
                        />
                    </VStack>
                </div>
            )}
            off={(
                <div className={classNames(cls.ArticleSortSelectors, {}, [className])}>
                    <Select
                        label={t('Сортировать ПО')}
                        value={sort}
                        updateSelect={onChangeSort}
                        options={sortOptions}
                    />
                    <Select
                        label={t('по')}
                        value={order}
                        updateSelect={onChangeOrder}
                        options={orderOptions}
                    />
                </div>
            )}
        />
    );
};
