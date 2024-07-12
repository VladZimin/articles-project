import { DeepPartial } from 'redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginPassword } from './selectLoginPassword';

describe('Select login password', () => {
    test('should return password ', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(selectLoginPassword(state as StateSchema)).toBe('123');
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(selectLoginPassword(state as StateSchema)).toBe('');
    });
});
