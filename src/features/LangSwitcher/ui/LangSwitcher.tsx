import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui';
import cls from './LangSwitcher.module.scss';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned';

interface ThemeSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: ThemeSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Button
                    variant="clear"
                    className={classNames(cls.toggleBtnRedesigned, {}, [className])}
                    onClick={toggleLang}
                >
                    {t('Короткий язык')}
                </Button>
            )}
            off={(
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={classNames(cls.toggleBtn, {}, [className])}
                    onClick={toggleLang}
                >
                    {short ? t('Короткий язык') : t('Язык')}
                </ButtonDeprecated>
            )}
        />

    );
});
