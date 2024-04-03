import {BuildOptions} from './types/config'
import {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import path from 'path'

export const buildDevServer = ({port}: BuildOptions): DevServerConfiguration => {
    return {
        port: port,
        open: true,
        historyApiFallback: true
    }
}