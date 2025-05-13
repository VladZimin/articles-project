import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Countries } from '../model/types/country';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

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

    const propsMap = {
        className,
        items: optionsCountries,
        onChange: onUpdateSelect,
        value,
        readonly,
        defaultValue: t('Укажите страну'),
        label: t('Страна'),
        direction: 'top right' as const,
    };

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={<ListBox {...propsMap} />}
            off={(
                <ListBoxDeprecated {...propsMap} />
            )}
        />
    );
});
