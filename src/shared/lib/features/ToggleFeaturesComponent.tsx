import { ReactElement } from 'react';
import { FeatureFlags } from '../../types/featureFlags';
import { getFeatureFlags } from './setGetFeatures';

interface ToggleFeaturesComponentProps {
    name: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleFeaturesComponent = ({ off, on, name }: ToggleFeaturesComponentProps) => {
    if (getFeatureFlags(name)) {
        return on;
    }

    return off;
};
