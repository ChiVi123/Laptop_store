'use client';

import { createTheme } from '@mui/material';
import { createContext } from 'react';
import { IAccount } from './types/models';

declare module '@mui/material/styles' {
    interface Palette {
        border: { main: string };
    }

    interface PaletteOptions {
        border?: { main?: string };
    }
}

export const AccountContext = createContext<IAccount | null>(null);

export const themeMUI = createTheme({
    palette: {
        primary: { main: '#1435C3' },
        text: { primary: '#353535', secondary: '#4C4C4C' },
        border: { main: '#949494' },
        grey: {
            50: '#ededed',
            100: '#dbdbdb',
            200: '#b7b7b7',
            300: '#949494',
            400: '#828282',
            500: '#707070',
            600: '#5e5e5e',
            700: '#4c4c4c',
            800: '#444444',
            900: '#353535',
            A100: '#dbdbdb',
            A200: '#b7b7b7',
            A400: '#828282',
            A700: '#4c4c4c',
        },
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
