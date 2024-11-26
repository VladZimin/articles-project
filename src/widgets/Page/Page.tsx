import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollPosition, scrollRestorationActions } from 'features/ScrollRestoration';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './Page.module.scss';

interface PageProps {
    className?: string
    onScrollEnd?: () => void
    children: ReactNode
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollPosition(state, pathname));
    const dispatch = useAppDispatch();

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestorationActions.setScroll({
            path: pathname,
            position: e.currentTarget.scrollTop,
        }));
    }, 1000);

    return (
        <main onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            {
                onScrollEnd && <div className={cls.trigger} ref={triggerRef} />
            }
        </main>
    );
});
