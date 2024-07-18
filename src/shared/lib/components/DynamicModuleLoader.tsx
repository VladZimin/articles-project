import { ReactElement, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    [key in StateSchemaKey]?: Reducer;
}
type ReducersListEntry = [StateSchemaKey, Reducer]
interface DynamicModuleLoaderProps {
    removeAfterUnmount?: boolean;
    reducers: ReducersList
    children: ReactElement;
}

export const DynamicModuleLoader = (props:DynamicModuleLoaderProps) => {
    const { children, removeAfterUnmount = false, reducers } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([key, reducer]: ReducersListEntry) => {
            store.reducerManager.add(key, reducer);
            dispatch({ type: `@INIT ${key} reducer` });
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([key]: ReducersListEntry) => {
                    store.reducerManager.remove(key);
                    dispatch({ type: `@DESTROY ${key} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
    return children;
};
