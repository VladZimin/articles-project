import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const fetchUserProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/getProfile',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        try {
            const res = await extra.api.get<Profile>('/profile');

            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
