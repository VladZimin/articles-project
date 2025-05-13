import { useTranslation } from 'react-i18next';
import cls from './ProfileCardDeprecated.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader, Text as TextDeprecated } from '@/shared/ui';
import { TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack max justify="center" className={classNames(cls.ProfileCard, {}, [cls.error])}>
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла непредвиденная ошибка')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack max justify="center" className={classNames(cls.ProfileCard, {}, [cls.loading])}>
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        updateLastName,
        updateFirstName,
        updateAge,
        updateCity,
        updateAvatar,
        updateUsername,
        updateCurrency,
        updateCountry,
    } = props;

    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editMode]: !readonly,
    };
    return (
        <VStack max className={classNames(cls.ProfileCard, mods, [className])}>
            {
                data?.avatar && (
                    <HStack max justify="center">
                        <AvatarDeprecated src={data?.avatar} alt="Select" size={150} />
                    </HStack>
                )
            }
            <VStack gap="16">
                <InputDeprecated
                    placeholder={t('Имя')}
                    value={data?.first}
                    readonly={readonly}
                    onChange={updateFirstName}
                />
                <InputDeprecated
                    placeholder={t('Фамилия')}
                    value={data?.lastname}
                    readonly={readonly}
                    onChange={updateLastName}
                />
                <InputDeprecated
                    placeholder={t('Возраст')}
                    value={data?.age}
                    readonly={readonly}
                    onChange={updateAge}
                />
                <InputDeprecated
                    placeholder={t('Город')}
                    value={data?.city}
                    readonly={readonly}
                    onChange={updateCity}
                />
                <InputDeprecated
                    placeholder={t('Юзернейм')}
                    value={data?.username}
                    readonly={readonly}
                    onChange={updateUsername}
                />
                <InputDeprecated
                    placeholder={t('Ссылка на аватар')}
                    value={data?.avatar}
                    readonly={readonly}
                    onChange={updateAvatar}
                />
                <CurrencySelect
                    value={data?.currency}
                    updateCurrency={updateCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    value={data?.country}
                    updateCountry={updateCountry}
                    readonly={readonly}
                />
            </VStack>
        </VStack>
    );
};
