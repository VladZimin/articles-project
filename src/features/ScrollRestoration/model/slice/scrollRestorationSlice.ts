import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../types/scrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
    scroll: {},
};

const ScrollRestorationSlice = createSlice({
    name: 'scrollRestoration',
    initialState,
    reducers: {
        setScroll: (state, { payload }: PayloadAction<{path: string, position: number}>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { reducer: scrollRestorationReducer, actions: scrollRestorationActions } = ScrollRestorationSlice;
