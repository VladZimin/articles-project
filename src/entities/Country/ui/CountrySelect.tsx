import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { Countries } from '../model/types/country';

interface CountrySelectProps {
  className?: string
  updateCountry?: (country: Countries) => void
  value?: Countries
  readonly?: boolean
}

const optionsCountries = [
    { value: Countries.RUSSIA, content: Countries.RUSSIA },
    { value: Countries.BELARUS, content: Countries.BELARUS },
    { value: Countries.KAZAKHSTAN, content: Countries.KAZAKHSTAN },
    { value: Countries.KYRGYZSTAN, content: Countries.KYRGYZSTAN },
    { value: Countries.UZBEKISTAN, content: Countries.UZBEKISTAN },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        updateCountry,
        value,
        readonly,
    } = props;
    const { t } = useTranslation();

    const onUpdateSelect = useCallback((value: string) => {
        updateCountry?.(value as Countries);
    }, [updateCountry]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={optionsCountries}
            onChange={onUpdateSelect}
            value={value}
            readonly={readonly}
            defaultValue={t('Укажите страну')}
            label={t('Страна')}
            direction="top right"
        />

    );
});
