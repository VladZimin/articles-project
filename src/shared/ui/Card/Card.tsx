import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}
interface CardProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode
    theme?: CardTheme
}

export const Card = (props: CardProps) => {
    const {
        className, children, theme = CardTheme.NORMAL, ...restProps
    } = props;
    return (
        <div className={classNames(cls.Card, {}, [cls[theme], className])} {...restProps}>
            {children}
        </div>
    );
};
