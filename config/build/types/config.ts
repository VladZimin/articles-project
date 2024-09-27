export type BuildPaths = {
    entry: string,
    build: string,
    html: string,
    src: string
}

export type BuildMode = 'development' | 'production'

export interface BuildEnv {
    mode: BuildMode,
    port: number,
    apiURL: string
}
export interface BuildOptions {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean,
    apiURL: string,
    port: number,
    project: 'storybook' | 'frontend' | 'jest'
}
