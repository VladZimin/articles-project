import { FeatureFlags } from '../../types/featureFlags';
import { getFeatureFlags } from '../features/setGetFeatures';

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags
    on: () => T
    off: () => T
}

export const toggleFeatures = <T>({ off, on, name }: ToggleFeaturesOptions<T>): T => {
    if (getFeatureFlags(name)) {
        return on();
    }

    return off();
};
