import { Countries, Currency } from 'shared/const/common';

export type Profile = {
    first: string,
    lastname: string,
    age: 27,
    currency: Currency,
    country: Countries,
    city: string,
    username: string,
    avatar: string
}

export type ProfileSchema = {
    data?: ProfileSchema
    isLoading: boolean
    error?: boolean
    readonly: boolean
}
