import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { userReducer } from 'entities/User';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        user: userReducer,
    };
    return configureStore<StateSchema>(
        {
            reducer: rootReducer,
            devTools: __IS_DEV__,
            preloadedState: initialState,
        },
    );
};
