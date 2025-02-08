import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';
import { Theme } from '@/shared/const/theme';

const meta = {
    title: 'shared/Select',
    component: Select,
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Выберите',
        options: [
            { value: 'b', content: 'bbbbbb' },
            { value: 'c', content: 'ccccccc' },
        ],
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
