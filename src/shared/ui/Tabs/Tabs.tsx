import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, useCallback } from 'react';
import { ArticleType } from 'entities/Article';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabType {
  value: ArticleType
  content: ReactNode
}
interface TabsProps {
    className?: string
    value: ArticleType
    tabs: TabType[]
    onChangeTab: (tab: ArticleType) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className, value, tabs, onChangeTab,
    } = props;

    const onTabClick = useCallback((tabValue: ArticleType) => () => {
        onChangeTab(tabValue);
    }, [onChangeTab]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    className={cls.tab}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                    onClick={onTabClick(tab.value)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
