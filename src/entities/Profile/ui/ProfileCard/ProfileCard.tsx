import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { fetchUserProfile } from 'entities/Profile';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = ({ className }:ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button theme={ButtonTheme.OUTLINE}>{t('Редактировать')}</Button>
            </div>
            <div className={cls.info}>
                <Input placeholder={t('Имя')} value={data?.first} className={cls.input} />
                <Input placeholder={t('Фамилия')} value={data?.lastname} className={cls.input} />
            </div>
        </div>
    );
};
