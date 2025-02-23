import { rtkQueryApi } from '@/shared/api/rtkQueryApi';
import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/userSchema';

interface SetJsonSettingsArgs {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkQueryApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArgs>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
            }),
        }),
    }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
