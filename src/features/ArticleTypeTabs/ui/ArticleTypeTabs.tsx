import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs as TabsDeprecated, TabType } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned';

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
            content: t('Все статьи'),
        },
        {
            value: ArticleType.IT,
            content: t('Программирование'),
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
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Tabs
                    className={classNames('', {}, [className])}
                    value={tabValue}
                    tabs={tabsType}
                    onChangeTab={onTabClick}
                    direction="column"
                />
            )}
            off={(
                <TabsDeprecated
                    className={classNames('', {}, [className])}
                    value={tabValue}
                    tabs={tabsType}
                    onChangeTab={onTabClick}
                />
            )}
        />
    );
};
