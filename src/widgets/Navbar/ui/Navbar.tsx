import { classNames } from 'shared/lib/classNames/classNames';
import {
    AppLink, AppLinkTheme, Button, ButtonTheme, Text,
} from 'shared/ui';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { TextSize, TextTheme } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '../../../entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }:NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const dispatch = useDispatch();

    const isAdminPanelAvailable = isAdmin || isManager;

    const onCloseModal = () => {
        setIsAuthModal(false);
    };
    const onShowModal = () => {
        setIsAuthModal(true);
    };
    const onLogout = () => {
        dispatch(userActions.logout());
    };
    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text size={TextSize.L} title="Dev Art" theme={TextTheme.INVERTED} className={cls.appName} />
                <AppLink to={RoutePath.articleCreate} theme={AppLinkTheme.INVERTED}>
                    {t('Создать статью')}
                </AppLink>
                <Dropdown
                    className={cls.dropdown}
                    items={[
                        ...(isAdminPanelAvailable ? [{
                            content: t('Админка'),
                            href: RoutePath.adminPanel,
                        }] : []),
                        {
                            content: t('Профиль'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Выйти'),
                            onClick: onLogout,
                        },
                    ]}
                    direction="bottom left"
                    trigger={<Avatar size={30} src={authData.avatar} alt="Avatar" />}
                />
            </header>
        );
    }
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={cls.links}
                onClick={onShowModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {t('Войти')}
            </Button>
            {
                isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            }
        </header>
    );
});
