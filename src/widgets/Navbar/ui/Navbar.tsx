import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    AppLink, AppLinkTheme, Button, ButtonTheme, Text,
} from '@/shared/ui';
import { LoginModal } from '@/features/AuthByUsername';
import { TextSize, TextTheme } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { getUserAuthData } from '../../../entities/User';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }:NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = () => {
        setIsAuthModal(false);
    };
    const onShowModal = () => {
        setIsAuthModal(true);
    };

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text size={TextSize.L} title="Dev Art" theme={TextTheme.INVERTED} className={cls.appName} />
                <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.INVERTED}>
                    {t('Создать статью')}
                </AppLink>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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
