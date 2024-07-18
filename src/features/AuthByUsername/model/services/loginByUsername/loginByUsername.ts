import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { User, userActions } from '../../../../../entities/User';

interface LoginByUsernameArg {
    username: string;
    password: string;
}
export const loginByUsername = createAsyncThunk<User, LoginByUsernameArg, {rejectValue: string}>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            const res = await axios.post<User>('http://localhost:8000/login', authData);

            if (!res.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(res.data));
            dispatch(userActions.setUserData(res.data));
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
