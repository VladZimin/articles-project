import { LinkProps, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
    className?: string
    activeClassName?: string
    variant?: AppLinkVariant
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        className,
        children,
        activeClassName = '',
        variant = 'primary',
        ...otherProps
    } = props;
    return (
        <NavLink
            className={({ isActive }) => classNames('', { [activeClassName]: isActive }, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
