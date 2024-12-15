import { Currency } from 'entities/Currency';
import { Countries } from 'entities/Country';
import { ValidateProfileError } from '../../types/editableProfileSchema';
import { validateProfileData } from './validateProfileData';

const data = {
    first: 'Vlad',
    lastname: 'Zimin',
    username: 'admin',
    age: 27,
    currency: Currency.EUR,
    city: 'Bishkek',
    country: Countries.KYRGYZSTAN,
};

describe('Validate profile data', () => {
    test('Correct data', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });
    test('without first and last name', async () => {
        const result = validateProfileData({ ...data, first: '', lastname: '' });

        expect(result).toEqual([
            ValidateProfileError.INVALID_USER_DATA,
        ]);
    });
    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined });

        expect(result).toEqual([
            ValidateProfileError.INVALID_AGE_DATA,
        ]);
    });
    test('incorrect country', async () => {
        const result = validateProfileData({ ...data, country: undefined });

        expect(result).toEqual([
            ValidateProfileError.INVALID_COUNTRY_DATA,
        ]);
    });
    test('incorrect country, age and user data', async () => {
        const result = validateProfileData({
            ...data, age: undefined, first: '', country: undefined,
        });

        expect(result).toEqual([
            ValidateProfileError.INVALID_USER_DATA,
            ValidateProfileError.INVALID_AGE_DATA,
            ValidateProfileError.INVALID_COUNTRY_DATA,
        ]);
    });
    test('without data', async () => {
        const result = validateProfileData();

        expect(result).toEqual([
            ValidateProfileError.NO_DATA,
        ]);
    });
});
