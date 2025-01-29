import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        height: 200,
        width: '100%',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Circle: Story = {
    args: {
        height: 200,
        width: 200,
        border: '50%',
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const PrimaryDark: Story = {
    args: {
        height: 200,
        width: '100%',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
export const CircleDark: Story = {
    args: {
        height: 200,
        width: 200,
        border: '50%',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
