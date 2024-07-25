import { LoginSchema } from '../../../AuthByUsername';
import { loginActions, loginReducer } from './loginSlice';

describe('Login slice', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '123',
        };

        expect(loginReducer(state as LoginSchema, loginActions.setUsername('1234'))).toEqual({ username: '1234' });
    });
    test('set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        };

        expect(loginReducer(state as LoginSchema, loginActions.setPassword('1234'))).toEqual({ password: '1234' });
    });
});
