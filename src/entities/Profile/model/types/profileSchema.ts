import { Currency } from '@/entities/Currency';
import { Countries } from '@/entities/Country';

export type Profile = {
    id?: string
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Countries,
    city?: string,
    username?: string,
    avatar?: string
}
