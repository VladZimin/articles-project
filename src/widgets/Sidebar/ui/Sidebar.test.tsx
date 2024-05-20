import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import { ComponentRender } from 'shared/lib/tests/componentRender/ComponentRender';

describe('Sidebar', () => {
    test('render Sidebar ', () => {
        ComponentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('toggle Sidebar', () => {
        ComponentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('toggle-sidebar-btn');
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
