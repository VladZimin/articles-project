import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';
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
        expect(getUserAuthData(state as StateSchema)).toEqual(data.authData);
    });
    test('should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getUserAuthData(state as StateSchema)).toBe(undefined);
    });
});
