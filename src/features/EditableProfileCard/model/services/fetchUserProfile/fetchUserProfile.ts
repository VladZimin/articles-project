import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchUserProfile = createAsyncThunk<Profile, string | undefined, ThunkConfig<string>>(
    'profile/getProfile',
    async (profileId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        try {
            const res = await extra.api.get<Profile>(`/profile/${profileId}`);
            if (!res.data) {
                throw new Error();
            }
            return res.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
