import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18forTests from 'shared/config/i18n/i18forTests';

export const renderWithTranslation = (component: ReactNode) => render(
    <I18nextProvider i18n={i18forTests}>
        {component}
    </I18nextProvider>,
);
