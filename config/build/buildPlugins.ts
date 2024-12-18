import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { BuildOptions } from './types/config';

export const buildPlugins = ({
    paths, isDev, apiURL, project,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
    const plugins = [
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: isDev,
            __API__: JSON.stringify(apiURL),
            __PROJECT__: JSON.stringify(project),
        }),
    ];
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
        plugins.push(new ReactRefreshPlugin());
    }
    return plugins;
};
