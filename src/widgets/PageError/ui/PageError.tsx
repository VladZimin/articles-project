import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string
}

export const PageError = ({ className }:PageErrorProps) => {
    const { t } = useTranslation();

    const reloadApp = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <h1 className={cls.header}>{t('Произошла непредвиденная ошибка')}</h1>
            <Button
                theme={ThemeButton.OUTLINE}
                onClick={reloadApp}
            >
                {t('Обновить приложение')}
            </Button>
        </div>
    );
};
