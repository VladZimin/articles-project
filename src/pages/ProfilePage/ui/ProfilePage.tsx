import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchUserProfile, ProfileCard, profileReducer } from '../../../entities/Profile';

interface ProfilePageProps {
    className?: string
}
const reducers = {
    profile: profileReducer,
};
const ProfilePage = memo(({ className }:ProfilePageProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
