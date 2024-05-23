import { createContext } from 'react';

export const LOCAL_STORAGE_THEME_KEY = 'theme';
export enum Theme {
    LIGHT = 'app-light-theme',
    DARK = 'app-dark-theme'
}

interface ThemeContextProps {
    theme?: Theme,
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({});
