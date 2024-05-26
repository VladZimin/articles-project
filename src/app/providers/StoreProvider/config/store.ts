import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername';
import { userReducer } from '../../../../entities/User';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
    };
    return configureStore<StateSchema>(
        {
            reducer: rootReducer,
            devTools: __IS_DEV__,
            preloadedState: initialState,
        },
    );
};
