// eslint-disable-next-line swq/layer-imports
import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line swq/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const RouterDecorator = (Story: StoryFn) => (
    <BrowserRouter>
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    </BrowserRouter>
);
