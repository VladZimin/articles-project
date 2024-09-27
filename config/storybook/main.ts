import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import webpack from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-styling-webpack',
        '@storybook/addon-styling',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }),
    webpackFinal: async (config) => {
        config!.plugins!.push(new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook'),
        }));
        config.module!.rules!.push(buildCssLoader(true));
        config.resolve!.modules = [
            ...(config.resolve!.modules || []),
            path.resolve(__dirname, '../../src'),
        ];
        const fileLoaderRule = config.module!.rules!.find(
            (rule: any) => rule.test as string && rule.test.test('.svg'),
        );
        // @ts-ignore
        fileLoaderRule.exclude = /\.svg$/;
        config.module!.rules!.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default config;
