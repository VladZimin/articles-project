import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../Currency/model/types/currency';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
    className?: string
    updateCurrency?: (currency: Currency) => void
    value?: Currency
    readonly?: boolean
}
const optionsCurrency = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];
export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        updateCurrency,
        value,
        readonly,
    } = props;
    const { t } = useTranslation();

    const onUpdateSelect = useCallback((value: string) => {
        updateCurrency?.(value as Currency);
    }, [updateCurrency]);

    const propsMap = {
        className,
        items: optionsCurrency,
        onChange: onUpdateSelect,
        value,
        readonly,
        defaultValue: t('Укажите валюту'),
        label: t('Валюта'),
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
