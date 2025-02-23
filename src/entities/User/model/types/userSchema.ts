import { UserRole } from '../const/userConst';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from './jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string
    features?: FeatureFlags;
    roles?: UserRole[]
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User
    _inited?: boolean
}
