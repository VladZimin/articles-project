import React, { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '../../../lib/hooks/useModal/useModal';
import { Overlay } from '@/shared/ui/redesigned/Overlay/Overlay';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const { isMounted, close, isClosing } = useModal({ onClose, isOpen });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app-modal'])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
