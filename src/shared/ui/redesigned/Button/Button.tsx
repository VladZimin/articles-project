import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
    square?: boolean
    disabled?: boolean
    variant?: ButtonVariant
    size?: ButtonSize
    fullwidth?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        size = 'm',
        disabled,
        fullwidth,
        addonRight,
        addonLeft,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullwidth]: fullwidth,
        [cls.withAddon]: Boolean(addonRight) || Boolean(addonLeft),
    };
    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {addonLeft}
            {children}
            {addonRight}
        </button>
    );
});
