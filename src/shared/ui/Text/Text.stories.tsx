import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextTheme } from './Text';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Text',
    component: Text,
    tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        title: 'Lorem Ipsum',
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryDark: Story = {
    args: {
        title: 'Lorem Ipsum',
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Error: Story = {
    args: {
        title: 'Lorem Ipsum',
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        theme: TextTheme.ERROR,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ErrorDark: Story = {
    args: {
        title: 'Lorem Ipsum',
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        theme: TextTheme.ERROR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OnlyTitle: Story = {
    args: {
        title: 'Lorem Ipsum',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const OnlyText: Story = {
    args: {
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
