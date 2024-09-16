import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Currency } from '../../Currency/model/types/currency';

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

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            options={optionsCurrency}
            updateSelect={onUpdateSelect}
            value={value}
            readonly={readonly}
        />
    );
});
