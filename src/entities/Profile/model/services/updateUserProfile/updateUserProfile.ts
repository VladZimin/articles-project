import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { validateProfileData } from '../../services/validateProfileData/validateProfileData';
import { Profile, ValidateProfileError } from '../../types/profileSchema';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateUserProfile = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfile',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;

        const formProfileData = getProfileForm(getState());
        const errors = validateProfileData(formProfileData);
        if (errors.length) {
            return rejectWithValue(errors);
        }
        try {
            const res = await extra.api.put<Profile>('/profile', formProfileData);
            return res.data;
        } catch (e) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
