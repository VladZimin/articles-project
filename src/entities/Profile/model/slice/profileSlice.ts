import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserProfile } from '../services/updateUserProfile/updateUserProfile';
import { Profile, ProfileSchema } from '../types/profileSchema';
import { fetchUserProfile } from '../services/fetchUserProfile/fetchUserProfile';

const initialState: ProfileSchema = {
    data: undefined,
    form: undefined,
    error: undefined,
    isLoading: false,
    readonly: true,
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        updateProfileForm: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        canselEditProfile: (state) => {
            state.form = state.data;
            state.readonly = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: profileReducer, actions: profileActions } = profileSlice;
