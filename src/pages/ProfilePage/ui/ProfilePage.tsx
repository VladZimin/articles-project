import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui';
import { TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Countries } from '../../../entities/Country';
import { Currency } from '../../../entities/Currency';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import {
    fetchUserProfile,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError,
} from '../../../entities/Profile';

interface ProfilePageProps {
    className?: string
}
const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(({ className }:ProfilePageProps) => {
    const dispatch = useAppDispatch();
    const formProfileData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const { t } = useTranslation('profile');

    const validateErrorTranslates = useMemo(() => ({
        [ValidateProfileError.INVALID_USER_DATA]: t('Имя и фамилия обязятельно'),
        [ValidateProfileError.INVALID_AGE_DATA]: t('Некорректный возраст'),
        [ValidateProfileError.INVALID_COUNTRY_DATA]: t('Некорректный регион'),
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    }), [t]);

    useInitialEffect(() => {
        dispatch(fetchUserProfile());
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
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader readonly={readonly} />
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
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
