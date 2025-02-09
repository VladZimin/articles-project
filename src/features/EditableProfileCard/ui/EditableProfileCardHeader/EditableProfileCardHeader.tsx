import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme, Text } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { profileActions } from '../../model/slice/profileSlice';
import { updateUserProfile } from '../../model/services/updateUserProfile/updateUserProfile';

interface ProfilePageHeaderProps {
  className?: string
  readonly?: boolean
  userId?: string
}

export const EditableProfileCardHeader = ({ className, readonly, userId }:ProfilePageHeaderProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);

    const isAuthUserProfile = authData?.id === userId;

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);
    const onCanselEdit = useCallback(() => {
        dispatch(profileActions.canselEditProfile());
    }, [dispatch]);
    const onSave = useCallback(() => {
        dispatch(updateUserProfile());
    }, [dispatch]);
    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {
                isAuthUserProfile && (readonly
                    ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                    : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCanselEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    ))
            }
        </HStack>
    );
};
