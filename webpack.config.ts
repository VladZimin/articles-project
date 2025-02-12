import path from 'path';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;

    const isDev = mode === 'development';
    const apiURL = env.apiURL || 'http://localhost:8000';
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'ui.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'ui.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiURL,
        project: 'frontend',
    });
};
