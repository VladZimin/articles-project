import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Tabs, TabType } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';

interface ArticleTypeTabsProps {
    className?: string
    tabValue: ArticleType
    onChangeTab: (tabValue: ArticleType) => void
}

export const ArticleTypeTabs = ({ className, tabValue, onChangeTab }:ArticleTypeTabsProps) => {
    const { t } = useTranslation();
    const tabsType = useMemo<TabType[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все'),
        },
        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
        },
    ], [t]);

    return (
        <Tabs
            className={classNames('', {}, [className])}
            value={tabValue}
            tabs={tabsType}
            onChangeTab={onChangeTab}
        />
    );
};
