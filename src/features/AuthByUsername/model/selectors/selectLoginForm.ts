import { StateSchema } from 'app/providers/StoreProvider';

export const selectLoginForm = (state: StateSchema) => state.loginForm;
