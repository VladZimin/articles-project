import { ReactElement, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
    [key in StateSchemaKey]?: Reducer;
}
interface DynamicModuleLoaderProps {
    removeAfterUnmount?: boolean;
    reducers: ReducersList
    children: ReactElement;
}

export const DynamicModuleLoader = (props:DynamicModuleLoaderProps) => {
    const { children, removeAfterUnmount = false, reducers } = props;
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManager;
    const reducersMap = store.reducerManager.getReducerMap();

    useEffect(() => {
        Object.entries(reducers).forEach(([key, reducer]) => {
            const mountedReducer = reducersMap[key as StateSchemaKey];
            if (!mountedReducer) {
                store.reducerManager.add(key as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${key} reducer` });
            }
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([key]) => {
                    store.reducerManager.remove(key as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${key} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
    return children;
};
