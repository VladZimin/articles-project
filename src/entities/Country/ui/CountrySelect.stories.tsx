import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CountrySelect } from './CountrySelect';

const meta = {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    tags: ['autodocs'],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
