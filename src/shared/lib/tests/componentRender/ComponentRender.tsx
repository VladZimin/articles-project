import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18forTests from '@/shared/config/i18n/i18forTests';
import { StoreProvider } from '@/app/providers/StoreProvider';

interface ComponentRenderOptions {
    route?: string
}
export const ComponentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
    const {
        route = '/',
    } = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider>
                <I18nextProvider i18n={i18forTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
};
