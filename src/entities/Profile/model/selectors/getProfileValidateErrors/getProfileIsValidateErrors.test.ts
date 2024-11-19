import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profileSchema';
import { getProfileValidateErrors } from './getProfileValidateErrors';

const validateErrors = [
    ValidateProfileError.SERVER_ERROR,
    ValidateProfileError.INVALID_AGE_DATA,
];
describe('Get profile validate errors', () => {
    test('should return validate errors ', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toBe(validateErrors);
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toBe(undefined);
    });
});
