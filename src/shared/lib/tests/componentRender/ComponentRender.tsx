import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18forTests from 'shared/config/i18n/i18forTests';
import { MemoryRouter } from 'react-router-dom';

interface ComponentRenderOptions {
    route?: string
}
export const ComponentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
    const {
        route = '/',
    } = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18forTests}>
                {component}
            </I18nextProvider>
        </MemoryRouter>,
    );
};
