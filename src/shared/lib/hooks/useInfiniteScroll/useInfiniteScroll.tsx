import { MutableRefObject, useEffect } from 'react';

export interface UseInfinityScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfinityScrollOptions) => {
    const {
        triggerRef,
        callback,
        wrapperRef,
    } = props;

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const wrapperElement = wrapperRef?.current ?? null;
        const triggerElement = triggerRef.current;
        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1,
            };
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement);
        }
        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
};
