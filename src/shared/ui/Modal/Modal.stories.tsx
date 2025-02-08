import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Modal',
    component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
    args: {
        className: `app ${Theme.LIGHT}`,
        isOpen: true,
        children: 'Lorem ipsum dolor sit ametconsectetur adipisicing elit. Ad amet commodi fugitillo inventore neque reiciendis repellat repellendus sequi tenetur. Lorem ipsum dolor sit ametconsectetur adipisicing elit. Ad amet commodi fugitillo inventore',
    },
};
export const Dark: Story = {
    args: {
        className: `app ${Theme.DARK}`,
        isOpen: true,
        children: 'Lorem ipsum dolor sit ametconsectetur adipisicing elit. Ad amet commodi fugitillo inventore neque reiciendis repellat repellendus sequi tenetur. Lorem ipsum dolor sit ametconsectetur adipisicing elit. Ad amet commodi fugitillo inventore',
    },
};
