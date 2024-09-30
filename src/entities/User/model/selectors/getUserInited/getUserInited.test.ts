import { StateSchema } from 'app/providers/StoreProvider';
import { getUserInited } from './getUserInited';
import { UserSchema } from '../../types/userSchema';

const data: UserSchema = {
    authData: {
        id: '2',
        username: 'admin',
    },
    _inited: false,
};
describe('Get profile data', () => {
    test('should return data ', () => {
        const state: DeepPartial<StateSchema> = {
            user: data,
        };
        expect(getUserInited(state as StateSchema)).toEqual(data._inited);
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getUserInited(state as StateSchema)).toBe(undefined);
    });
});
