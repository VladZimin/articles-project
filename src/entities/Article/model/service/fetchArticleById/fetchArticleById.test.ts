import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from '../../../../Currency';
import { Countries } from '../../../../Country';
import { fetchArticleById } from './fetchArticleById';

const data = {
    first: 'Vlad',
    lastname: 'Zimin',
    username: 'admin',
    age: 27,
    currency: Currency.EUR,
    city: 'Bishkek',
    country: Countries.KYRGYZSTAN,
};

describe('Async thunk fetch article by id', () => {
    test('success fetching', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({
            data,
        }));
        const result = await thunk.callThunk('1');

        expect(thunk.dispatch).toHaveBeenCalled();
        expect(result.payload).toEqual(data);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });
    test('reject fetching', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
