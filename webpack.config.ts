import path from 'path';
import { BuildEnv, BuildMode, BuildPaths } from './config/builds/types/config';
import { buildWebpackConfig } from './config/builds/buildWebpackConfig';

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return '/api';
    }
    return 'http://localhost:8000';
};

export default (env: BuildEnv) => {
    const mode = env?.mode || 'development';
    const PORT = env?.port || 3000;

    const isDev = mode === 'development';
    const apiURL = getApiUrl(mode, env.apiURL);
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
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
