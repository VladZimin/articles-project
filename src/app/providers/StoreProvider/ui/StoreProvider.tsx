import { Provider } from 'react-redux';
import { createReduxStore, StateSchema } from 'app/providers/StoreProvider';
import { ReactNode } from 'react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { DeepPartial } from 'redux';

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = ({ children, initialState, asyncReducers }:StoreProviderProps) => {
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
