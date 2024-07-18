import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthData, userActions } from '../../../entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }:NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(selectUserAuthData);
    const { t } = useTranslation();

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
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    className={cls.links}
                    onClick={onLogout}
                    theme={ButtonTheme.CLEAR_INVERTED}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
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
        </div>
    );
});
