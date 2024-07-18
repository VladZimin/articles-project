import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';

const initialState: ProfileSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
    readonly: true,
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { reducer: profileReducer, actions: profileActions } = profileSlice;
