import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui';
import { Modal } from 'shared/ui/Modal/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }:NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const toggleAuthModal = () => {
        setIsAuthModal((prevState) => !prevState);
    };
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                className={cls.links}
                onClick={toggleAuthModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={toggleAuthModal}>
                {/* eslint-disable-next-line */}
                <p>
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Ad amet commodi fugit
                    illo inventore neque reiciendis repellat repellendus sequi tenetur.
                </p>
            </Modal>
        </div>
    );
};
