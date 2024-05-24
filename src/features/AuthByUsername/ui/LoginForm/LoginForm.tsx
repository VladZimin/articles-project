import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }:LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input type="text" className={cls.input} autoFocus placeholder={t('Имя пользователя')} />
            <Input type="password" className={cls.input} placeholder={t('Пароль')} />
            <Button className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
};
