import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from '../../../../../entities/User';

interface LoginByUsernameArg {
    username: string;
    password: string;
}
export const loginByUsername = createAsyncThunk<User, LoginByUsernameArg, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        try {
            const res = await extra.api.post<User>('/login', authData);
            if (!res.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(res.data));
            dispatch(userActions.setUserData(res.data));
            extra.navigate('/about');
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
