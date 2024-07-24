import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from 'app/providers/StoreProvider/config/reducerManager';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { userReducer } from '../../../../entities/User';
import { StateSchema } from './StateSchema';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducer);
    const store = configureStore<StateSchema>(
        {
            reducer: reducerManager.reduce,
            devTools: __IS_DEV__,
            preloadedState: initialState,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                        navigate,
                    },
                },
            }),
        },
    );
    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
