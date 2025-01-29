import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from './Button';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Button',
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        children: 'Button',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Clear: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearInverted: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR_INVERTED,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearSizeL: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR,
        size: ButtonSize.L,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearSizeXL: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR,
        size: ButtonSize.XL,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const ClearDark: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Outline: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const OutlineSizeL: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const OutlineSizeXL: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const OutlineDark: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Background: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.BACKGROUND,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const BackgroundInverted: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const Square: Story = {
    args: {
        children: 'M',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const SquareSizeL: Story = {
    args: {
        children: 'L',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        size: ButtonSize.L,
        square: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const SquareSizeXL: Story = {
    args: {
        children: 'XL',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        size: ButtonSize.XL,
        square: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Disabled: Story = {
    args: {
        children: 'Disabled',
        theme: ButtonTheme.OUTLINE,
        disabled: true,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
