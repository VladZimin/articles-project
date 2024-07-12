import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { User, userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('Async thunk login by username', () => {
    test('success login', async () => {
        const userData: User = {
            username: 'admin',
            id: '1',
        };
        mockedAxios.post.mockReturnValue(Promise.resolve({
            data: userData,
        }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(userData));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userData);
    });
    test('reject login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Error');
    });
});
