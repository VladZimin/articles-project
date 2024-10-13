import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui';
import { ButtonSize } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { LangSwitcher } from '../../../LangSwitcher';
import { ThemeSwitcher } from '../../../ThemeSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
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
        <menu
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
            <div className={cls.items}>
                {sidebarItems}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </menu>
    );
});
