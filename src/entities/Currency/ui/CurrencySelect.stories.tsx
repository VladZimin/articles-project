import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CurrencySelect } from './CurrencySelect';

const meta = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    tags: ['autodocs'],
} satisfies Meta<typeof CurrencySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
