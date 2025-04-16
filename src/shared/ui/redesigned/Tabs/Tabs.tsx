import { ReactNode, useCallback } from 'react';
import { Card } from '../Card';
import cls from './Tabs.module.scss';
import { Flex } from '../Stack/Flex/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface TabType {
  value: string
  content: ReactNode
}
interface TabsProps {
    className?: string
    value: string
    tabs: TabType[]
    direction?: 'row' | 'column'
    onChangeTab: (tab: TabType) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className, value, tabs, onChangeTab, direction = 'row',
    } = props;

    const onTabClick = useCallback((tabValue: TabType) => () => {
        onChangeTab(tabValue);
    }, [onChangeTab]);

    return (
        <Flex direction={direction} align="start" gap="8" className={className}>
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        key={tab.value}
                        className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
                        variant={isSelected ? 'light' : 'normal'}
                        onClick={onTabClick(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};
