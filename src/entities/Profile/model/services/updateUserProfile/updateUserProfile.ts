import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm, Profile } from '../../../../../entities/Profile';

export const updateUserProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfile',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const formProfileData = getProfileForm(getState());
        try {
            const res = await extra.api.put<Profile>('/profile', formProfileData);
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
