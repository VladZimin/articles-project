import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/types/sidebarItem';
import { getUserAuthData } from '../../../../entities/User';
import cls from './SidebarItem.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AppLink, Icon } from '@/shared/ui/redesigned';

interface SidebarItemProps {
    item: SidebarItemType
    collapsed?: boolean
}

export const SidebarItem = memo(({ item, collapsed = false }:SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (!isAuth && item.authOnly) {
        return null;
    }

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <AppLink
                    to={item.path}
                    activeClassName={cls.active}
                    className={classNames(cls.itemRedesigned, { [cls.collapsedRedesigned]: collapsed })}
                >
                    <Icon Svg={item.Icon} />
                    <span className={cls.link}>
                        {t(item.text)}
                    </span>
                </AppLink>
            )}
            off={(
                <AppLinkDeprecated
                    to={item.path}
                    className={classNames(cls.item, { [cls.collapsed]: collapsed })}
                    theme={AppLinkTheme.INVERTED}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>
                        {t(item.text)}
                    </span>
                </AppLinkDeprecated>
            )}
        />
    );
});
