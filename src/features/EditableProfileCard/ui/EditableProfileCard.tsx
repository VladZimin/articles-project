import { Text } from 'shared/ui';
import { TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from 'entities/Currency';
import { Countries } from 'entities/Country';
import { ProfileCard } from 'entities/Profile';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { getProfileForm } from '../model/selectors/getProfileForm/getProfileForm';
import {
    EditableProfileCardHeader,
} from './EditableProfileCardHeader/EditableProfileCardHeader';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';
import {
    getProfileValidateErrors,
} from '../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../model/types/editableProfileSchema';
import { fetchUserProfile } from '../model/services/fetchUserProfile/fetchUserProfile';
import { profileActions, profileReducer } from '../model/slice/profileSlice';

interface EditableProfileCardProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = ({ className }:EditableProfileCardProps) => {
    const dispatch = useAppDispatch();
    const formProfileData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const { t } = useTranslation('profile');
    const { id } = useParams<{id: string}>();

    const validateErrorTranslates = useMemo(() => ({
        [ValidateProfileError.INVALID_USER_DATA]: t('Имя и фамилия обязятельно'),
        [ValidateProfileError.INVALID_AGE_DATA]: t('Некорректный возраст'),
        [ValidateProfileError.INVALID_COUNTRY_DATA]: t('Некорректный регион'),
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    }), [t]);

    useInitialEffect(() => {
        dispatch(fetchUserProfile(id));
    });

    const updateFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ first: value || '' }));
    }, [dispatch]);
    const updateLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ lastname: value || '' }));
    }, [dispatch]);
    const updateAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ age: Number(value || 0) }));
    }, [dispatch]);
    const updateCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ city: value || '' }));
    }, [dispatch]);
    const updateUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ username: value || '' }));
    }, [dispatch]);
    const updateAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfileForm({ avatar: value || '' }));
    }, [dispatch]);
    const updateCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfileForm({ currency }));
    }, [dispatch]);
    const updateCountry = useCallback((country: Countries) => {
        dispatch(profileActions.updateProfileForm({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="16" max>
                <EditableProfileCardHeader readonly={readonly} userId={id} />
                {validateErrors?.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                    />
                ))}
                <ProfileCard
                    data={formProfileData}
                    error={error}
                    isLoading={isLoading}
                    readonly={readonly}
                    updateFirstName={updateFirstName}
                    updateLastName={updateLastName}
                    updateAge={updateAge}
                    updateCity={updateCity}
                    updateAvatar={updateAvatar}
                    updateUsername={updateUsername}
                    updateCurrency={updateCurrency}
                    updateCountry={updateCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
};
