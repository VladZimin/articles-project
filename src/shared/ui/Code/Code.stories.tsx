import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Code } from './Code';

const meta = {
    title: 'shared/Code',
    component: Code,
    tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const code = 'import type { Meta, StoryObj } from \'@storybook/react\';\n'
  + 'import { ThemeDecorator } from \'shared/config/storybook/ThemeDecorator/ThemeDecorator\';\n'
  + 'import { Theme } from \'app/providers/ThemeProvider\';\n'
  + 'import { Code } from \'./Code\';\n'
  + '\n'
  + 'const meta = {\n'
  + '    title: \'shared/Code\',\n'
  + '    component: Code,\n'
  + '    tags: [\'autodocs\'],\n'
  + '} satisfies Meta<typeof Code>;\n'
  + '\n'
  + 'export default meta;\n';

export const Primary: Story = {
    args: {
        text: code,
    },
    decorators: [ThemeDecorator(Theme.LIGHT)],
};

export const Dark: Story = {
    args: {
        text: code,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
