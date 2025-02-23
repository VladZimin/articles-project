import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
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
            dispatch(userActions.setUserData(res.data));
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
