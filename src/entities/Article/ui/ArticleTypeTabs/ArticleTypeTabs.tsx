import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs, TabType } from '@/shared/ui/Tabs';

import { ArticleType } from '../../model/const/articleConst';

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

    const onTabClick = useCallback((tab: TabType) => {
        onChangeTab(tab.value as ArticleType);
    }, [onChangeTab]);

    return (
        <Tabs
            className={classNames('', {}, [className])}
            value={tabValue}
            tabs={tabsType}
            onChangeTab={onTabClick}
        />
    );
};
