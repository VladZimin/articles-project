import { Countries, Currency } from 'shared/const/common';

export type Profile = {
    first: string,
    lastname: string,
    age: number,
    currency: Currency,
    country: Countries,
    city: string,
    username: string,
    avatar: string
}

export type ProfileSchema = {
    data?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
}
