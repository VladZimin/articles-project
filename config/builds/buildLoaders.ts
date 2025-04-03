import webpack from 'webpack';

import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            },
                        },
                        {
                            name: 'removeStyleElement',
                        },
                    ],
                },
            },
        }],
    };
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const cssLoader = buildCssLoader(isDev);

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxBabelLoader,
        cssLoader,
    ];
};
