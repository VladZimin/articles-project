import { memo, ReactElement } from 'react';
import cls from './StickyContentLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MainLayoutProps {
    className?: string
    content: ReactElement
    left?: ReactElement
    right?: ReactElement
}

export const StickyContentLayout = memo(({
    className, content, left, right,
}:MainLayoutProps) => {
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            {right && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {left && <div className={cls.right}>{right}</div>}
        </div>
    );
});
