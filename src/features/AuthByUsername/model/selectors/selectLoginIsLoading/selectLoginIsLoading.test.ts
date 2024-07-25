import { StateSchema } from 'app/providers/StoreProvider';
import { selectLoginIsLoading } from './selectLoginIsLoading';

describe('Select login isLoading', () => {
    test('should return true ', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(selectLoginIsLoading(state as StateSchema)).toBe(true);
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(selectLoginIsLoading(state as StateSchema)).toBe(false);
    });
});
