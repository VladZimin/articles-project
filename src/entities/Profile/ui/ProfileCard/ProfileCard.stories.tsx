import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import AvatarImg from '@/shared/assets/tests/storybook.jpg';
import { Currency } from '../../../Currency';
import { Countries } from '../../../Country';
import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;
const data = {
    first: 'Vlad',
    lastname: 'Zimin',
    username: 'admin',
    age: 27,
    currency: Currency.EUR,
    city: 'Bishkek',
    country: Countries.KYRGYZSTAN,
    avatar: AvatarImg,
};
export const Primary: Story = {
    args: {
        data,
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ],
};
export const Error: Story = {
    args: {
        error: 'true',
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ],
};
export const Loading: Story = {
    args: {
        isLoading: true,
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ],
};
export const Readonly: Story = {
    args: {
        data,
        readonly: true,
    },
    decorators: [
        ThemeDecorator(Theme.LIGHT),
    ],
};
