import { UserRole } from '../const/userConst';
import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
    id: string;
    username: string;
    avatar?: string
    features?: FeatureFlags;
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User
    _inited?: boolean
}
