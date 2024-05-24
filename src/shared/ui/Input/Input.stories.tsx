import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Input } from './Input';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Input',
    component: Input,
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter text',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Autofocus: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter text',
        autoFocus: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
