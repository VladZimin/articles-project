import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode
}

export const Card = (props: CardProps) => {
    const { className, children, ...restProps } = props;
    return (
        <div className={classNames(cls.Card, {}, [className])} {...restProps}>
            {children}
        </div>
    );
};
