import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScroll = (state:StateSchema) => state.scroll.scroll;
export const getScrollPosition = createSelector(
    getScroll,
    (state:StateSchema, path: string) => path,
    (scroll, path) => scroll[path] ?? 0,
);
