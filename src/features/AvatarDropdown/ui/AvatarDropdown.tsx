import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = ({ className }:AvatarDropdownProps) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useAppDispatch();

    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable ? [{
            content: t('Админка'),
            href: getRouteAdmin(),
        }] : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (

        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Dropdown
                    className={classNames('', {}, [className])}
                    items={items}
                    direction="bottom left"
                    trigger={<Avatar size={40} src={authData.avatar} alt="Avatar" />}
                />
            )}
            off={(
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    items={items}
                    direction="bottom left"
                    trigger={<AvatarDeprecated size={30} src={authData.avatar} alt="Avatar" />}
                />
            )}
        />

    );
};
