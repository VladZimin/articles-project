import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User';

const initialState: UserSchema = {};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const { reducer: userReducer, actions: userActions } = userSlice;
