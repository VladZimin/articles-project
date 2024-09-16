import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Countries } from '../../../entities/Country';
import { Currency } from '../../../entities/Currency';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import {
    fetchUserProfile,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from '../../../entities/Profile';

interface ProfilePageProps {
    className?: string
}
const reducers = {
    profile: profileReducer,
};
const ProfilePage = memo(({ className }:ProfilePageProps) => {
    const dispatch = useAppDispatch();
    const formProfileData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

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
