import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginUsername } from './selectLoginUsername';

describe('Select login username', () => {
    test('should return password ', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'admin',
            },
        };
        expect(selectLoginUsername(state as StateSchema)).toBe('admin');
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(selectLoginUsername(state as StateSchema)).toBe('');
    });
});
