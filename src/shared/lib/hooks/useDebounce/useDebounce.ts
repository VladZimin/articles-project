import { useCallback, useRef } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<TimeoutId | null>(null);
    return useCallback((...args: any[]) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};
