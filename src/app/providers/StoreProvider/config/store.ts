import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { CombinedState } from 'redux';
import { userReducer } from '../../../../entities/User';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };
    const extraArgs: ThunkExtraArg = {
        api: $api,
        navigate,
    };
    const reducerManager = createReducerManager(rootReducer);
    const store = configureStore<StateSchema>(
        {
            reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
            devTools: __IS_DEV__,
            preloadedState: initialState,
            middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArgs,
                },
            }),
        },
    );
    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
