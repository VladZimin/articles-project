import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../../types/jsonSettings';

const emptyJsonSettings: JsonSettings = {};

export const getJsonSettings = (state: StateSchema) => state.user?.authData?.jsonSettings ?? emptyJsonSettings;
export const getJsonSettingsByKey = createSelector(
    [getJsonSettings, (state, key: keyof JsonSettings) => key],
    (jsonSettings, key) => jsonSettings?.[key],
);
