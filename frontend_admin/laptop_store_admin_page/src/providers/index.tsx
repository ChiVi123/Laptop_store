'use client';

import { ThemeProvider, createTheme } from '@mui/material';
import { IOnlyChildren } from '~/types/props';

declare module '@mui/material/styles' {
    interface Palette {
        border: { main: string };
    }

    interface PaletteOptions {
        border?: { main?: string };
    }
}

const theme = createTheme({
    palette: {
        primary: { main: '#1435C3' },
        text: { primary: '#353535', secondary: '#4C4C4C' },
        border: { main: '#949494' },
    },
    typography: {
        h1: { fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.2 }, //20px
        h2: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.2 }, //18px
        h3: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.2 }, //16px
        h4: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.2 }, //14px
        h5: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.2 }, //12px
        h6: { fontSize: '0.625rem', fontWeight: 400, lineHeight: 1.2 }, //10px
        subtitle1: { lineHeight: 1.2 },
        subtitle2: { lineHeight: 1.2 },
        body2: { lineHeight: 1.5 },
        button: { textTransform: 'none' },
    },
});

export function ThemeMUIProvider({ children }: IOnlyChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
