import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { $api } from 'shared/api/api';
import { CombinedState } from 'redux';
import { scrollRestorationReducer } from 'features/ScrollRestoration';
import { userReducer } from '../../../../entities/User';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scroll: scrollRestorationReducer,
    };
    const extraArgs: ThunkExtraArg = {
        api: $api,
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
