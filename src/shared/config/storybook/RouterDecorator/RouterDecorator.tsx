import 'app/styles/index.scss';
import { StoryContext, StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';

export const RouterDecorator = (Story: StoryFn) => (
    <BrowserRouter>
        <ThemeProvider>
            <Story />
        </ThemeProvider>
    </BrowserRouter>
);
