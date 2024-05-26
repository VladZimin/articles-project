import { Provider } from 'react-redux';
import { createReduxStore, StateSchema } from 'app/providers/StoreProvider';
import { ReactNode } from 'react';
// @ts-ignore
import { DeepPartial } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = ({ children, initialState }:StoreProviderProps) => {
    const store = createReduxStore(initialState);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
