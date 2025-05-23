import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../const/editableProfileConst';
import { validateProfileData } from '../../services/validateProfileData/validateProfileData';
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
            const res = await extra.api.put<Profile>(`/profile/${formProfileData?.id}`, formProfileData);
            if (!res.data) {
                throw new Error();
            }
            return res.data;
        } catch (e) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
