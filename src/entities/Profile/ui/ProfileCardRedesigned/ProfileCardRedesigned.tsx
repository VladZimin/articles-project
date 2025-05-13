import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Avatar, Card, HStack, Input, Skeleton, Text, VStack,
} from '@/shared/ui/redesigned';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');

    return (
        <Card max padding="24">
            <HStack max justify="center">
                <Text
                    variant="error"
                    title={t('Произошла непредвиденная ошибка')}
                    text={t('Попробуйте обновить страницу')}
                    align="center"
                />
            </HStack>
        </Card>
    );
};

export const ProfileCardRedesignedLoader = () => {
    return (
        <Card max padding="24">
            <VStack align="center" max gap="32">
                <Skeleton height={128} width={128} border="50%" />
                <HStack max gap="24">
                    <VStack max gap="16">
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                    </VStack>
                    <VStack max gap="16">
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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

    return (
        <Card max padding="24" className={classNames('', {}, [className])}>
            <VStack gap="32">
                {
                    data?.avatar && (
                        <HStack max justify="center">
                            <Avatar src={data?.avatar} alt="Select" size={128} />
                        </HStack>
                    )
                }
                <HStack max gap="24">
                    <VStack max gap="16">
                        <Input
                            label={t('Имя')}
                            value={data?.first}
                            readonly={readonly}
                            onChange={updateFirstName}
                        />
                        <Input
                            label={t('Фамилия')}
                            value={data?.lastname}
                            readonly={readonly}
                            onChange={updateLastName}
                        />
                        <Input
                            label={t('Возраст')}
                            value={data?.age}
                            readonly={readonly}
                            onChange={updateAge}
                        />
                        <Input
                            label={t('Город')}
                            value={data?.city}
                            readonly={readonly}
                            onChange={updateCity}
                        />
                    </VStack>
                    <VStack max gap="16">
                        <Input
                            label={t('Юзернейм')}
                            value={data?.username}
                            readonly={readonly}
                            onChange={updateUsername}
                        />
                        <Input
                            label={t('Аватар')}
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
                </HStack>
            </VStack>
        </Card>
    );
};
