import { Action } from '@reduxjs/toolkit';
import { Currency } from '@/entities/Currency';
import { Countries } from '@/entities/Country';
import { ValidateProfileError } from '../const/editableProfileConst';
import { ProfileSchema } from '../types/editableProfileSchema';
import { updateUserProfile } from '../services/updateUserProfile/updateUserProfile';
import { profileActions, profileReducer } from './profileSlice';

const data = {
    first: 'Vlad',
    lastname: 'Zimin',
    username: 'admin',
    age: 27,
    currency: Currency.EUR,
    city: 'Bishkek',
    country: Countries.KYRGYZSTAN,
};

describe('Profile slice', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };

        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });
    test('update profile form', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { first: '123' },
        };

        expect(profileReducer(state as ProfileSchema, profileActions.updateProfileForm({ first: '1234' }))).toEqual({
            form: { first: '1234' },
        });
    });
    test('cansel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            validateErrors: [],
        };

        expect(profileReducer(state as ProfileSchema, profileActions.canselEditProfile()))
            .toEqual({
                validateErrors: undefined,
                readonly: true,
            });
    });
    test('update profile with pending status', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };

        expect(profileReducer(state as ProfileSchema, updateUserProfile.pending as Action))
            .toEqual({
                validateErrors: undefined,
                isLoading: true,
            });
    });
    test('update profile with fulfilled status', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(profileReducer(state as ProfileSchema, updateUserProfile.fulfilled(data, '')))
            .toEqual({
                validateErrors: undefined,
                isLoading: false,
                readonly: true,
                form: data,
                data,
            });
    });
    // test('update profile with rejected status', () => {
    //     const state: DeepPartial<EditableProfileSchema> = {
    //         isLoading: true,
    //     };
    //
    //     expect(profileReducer(state as EditableProfileSchema, updateUserProfile.rejected({ name: 'error', message: 'Error' }, '')))
    //         .toEqual({
    //             validateErrors: [ValidateProfileError.SERVER_ERROR],
    //             isLoading: false,
    //         });
    // });
});
