import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Avatar } from './Avatar';
import AvatarImg from './storybook.jpg';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        src: AvatarImg,
        alt: 'Avatar',
        size: 150,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
export const Small: Story = {
    args: {
        src: AvatarImg,
        alt: 'Avatar',
        size: 50,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};
