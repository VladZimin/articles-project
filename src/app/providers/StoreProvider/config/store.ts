import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { scrollRestorationReducer } from '@/features/ScrollRestoration';
import { rtkQueryApi } from '@/shared/api/rtkQueryApi';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { userReducer } from '@/entities/User';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scroll: scrollRestorationReducer,
        [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
    };
    const extraArgs: ThunkExtraArg = {
        api: $api,
    };
    const reducerManager = createReducerManager(rootReducer);
    const store = configureStore<StateSchema>(
        {
            reducer: reducerManager.reduce as Reducer<StateSchema>,
            devTools: __IS_DEV__,
            preloadedState: initialState,
            middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArgs,
                },
            }).concat(rtkQueryApi.middleware),
        },
    );
    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
