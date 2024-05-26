import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { selectLoginForm } from '../../model/selectors/selectLoginForm';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({ className }:LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(selectLoginForm);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onSubmitForm = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                type="text"
                className={cls.input}
                value={username}
                onChange={onChangeUsername}
                placeholder={t('Имя пользователя')}
                autoFocus
            />
            <Input
                type="password"
                className={cls.input}
                value={password}
                onChange={onChangePassword}
                placeholder={t('Пароль')}
            />
            <Button
                className={cls.loginBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onSubmitForm}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
