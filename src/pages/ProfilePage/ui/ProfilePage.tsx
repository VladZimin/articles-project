import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader';
import { profileReducer } from '../../../entities/Profile/index';

interface ProfilePageProps {
    className?: string
}
const reducers = {
    profile: profileReducer,
};
const ProfilePage = memo(({ className }:ProfilePageProps) => {
    const { t } = useTranslation('profile');
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                {t('Профиль')}
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
