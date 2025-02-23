import React, {
    ReactNode, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { getJsonSettings } from '@/entities/User';

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const { theme: defaultTheme } = useSelector(getJsonSettings);
    const [theme, setTheme] = useState<Theme>(defaultTheme || Theme.LIGHT);
    const [isInitedTheme, setIsInitedTheme] = useState(false);

    const defaultValue = useMemo(() => ({ theme, setTheme }), [theme]);

    useEffect(() => {
        if (!isInitedTheme && defaultTheme) {
            setTheme(defaultTheme);
            setIsInitedTheme(true);
        }
    }, [defaultTheme, isInitedTheme]);
    return (
        <ThemeContext.Provider value={defaultValue}>
            {children}
        </ThemeContext.Provider>
    );
};
