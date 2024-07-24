import path from 'path';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;

    const isDev = mode === 'development';
    const apiURL = env.apiURL || 'http://localhost:8000';
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    return buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiURL,
    });
};
