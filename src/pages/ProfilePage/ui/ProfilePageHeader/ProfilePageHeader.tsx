import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { profileActions, updateUserProfile } from '../../../../entities/Profile';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string
    readonly?: boolean
}

export const ProfilePageHeader = ({ className, readonly }:ProfilePageHeaderProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('profile');

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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {
                readonly
                    ? (
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                    : (
                        <>
                            <Button
                                className={cls.canselBtn}
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCanselEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={cls.saveBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )
            }
        </div>
    );
};
