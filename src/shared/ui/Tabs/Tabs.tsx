import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabType {
  value: string
  content: ReactNode
}
interface TabsProps {
    className?: string
    value: string
    tabs: TabType[]
    onChangeTab: (tab: TabType) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className, value, tabs, onChangeTab,
    } = props;

    const onTabClick = useCallback((tabValue: TabType) => () => {
        onChangeTab(tabValue);
    }, [onChangeTab]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    className={cls.tab}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                    onClick={onTabClick(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
