import {
    memo, ReactNode, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ButtonSize } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SidebarProps {
    className?: string
}

interface DeprecatedSidebarProps extends SidebarProps {
    collapsed: boolean
    onToggle: VoidFunction
    items: ReactNode[]
}

function DeprecatedSidebar({
    className, items, collapsed, onToggle,
}: DeprecatedSidebarProps) {
    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="toggle-sidebar-btn"
                onClick={onToggle}
                className={cls.collapsedBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack role="navigation" gap="16" className={cls.items}>
                {items}
            </VStack>
            <div className={cls.switchers} role="navigation">
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
}

function RedesignedSidebar({
    className, items, collapsed, onToggle,
}: DeprecatedSidebarProps) {
    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}
        >
            <AppLogo className={cls.appLogo} />
        </aside>
    );
}

export const Sidebar = memo(({ className }:SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prevState) => !prevState);
    };
    const sidebarItems = useMemo(
        () => sidebarItemList.map((item) => <SidebarItem item={item} key={item.path} collapsed={collapsed} />),
        [collapsed, sidebarItemList],
    );

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <RedesignedSidebar
                    className={className}
                    collapsed={collapsed}
                    onToggle={onToggle}
                    items={sidebarItems}
                />
            )}
            off={(
                <DeprecatedSidebar
                    className={className}
                    collapsed={collapsed}
                    onToggle={onToggle}
                    items={sidebarItems}
                />
            )}
        />
    );
});
