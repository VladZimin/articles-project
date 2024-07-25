import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { selectLoginUsername } from '../../model/selectors/selectLoginUsername/selectLoginUsername';
import { selectLoginPassword } from '../../model/selectors/selectLoginPassword/selectLoginPassword';
import { selectLoginError } from '../../model/selectors/selectLoginError/selectLoginError';
import { selectLoginIsLoading } from '../../model/selectors/selectLoginIsLoading/selectLoginIsLoading';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};
const LoginForm = memo(({ className, onSuccess }:LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(selectLoginUsername);
    const password = useSelector(selectLoginPassword);
    const error = useSelector(selectLoginError);
    const isLoading = useSelector(selectLoginIsLoading);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onSubmitForm = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [onSuccess, dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
