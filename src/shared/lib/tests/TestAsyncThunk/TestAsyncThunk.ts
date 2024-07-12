import { StateSchema } from 'app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';

type ThunkCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, {rejectValue: RejectedValue}>
export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    thunkCreator: ThunkCreatorType<Return, Arg, RejectedValue>;

    constructor(thunkCreator: ThunkCreatorType<Return, Arg, RejectedValue>) {
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.thunkCreator = thunkCreator;
    }

    async callThunk(arg: Arg) {
        const action = this.thunkCreator(arg);
        const result = await action(this.dispatch, this.getState, undefined);

        return result;
    }
}
