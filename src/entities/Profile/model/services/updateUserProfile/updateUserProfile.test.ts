import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from 'entities/Currency';
import { Countries } from 'entities/Country';
import { ValidateProfileError } from '../../types/profileSchema';
import { updateUserProfile } from './updateUserProfile';

const data = {
    first: 'Vlad',
    lastname: 'Zimin',
    username: 'admin',
    age: 27,
    currency: Currency.EUR,
    city: 'Bishkek',
    country: Countries.KYRGYZSTAN,
};

describe('Async thunk update user profile', () => {
    test('success updating', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({
            data,
        }));
        const result = await thunk.callThunk();

        expect(result.payload).toEqual(data);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });
    test('reject updating', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ]);
    });
    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateUserProfile, {
            profile: {
                form: { ...data, first: '' },
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({
            data,
        }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INVALID_USER_DATA,
        ]);
    });
});
