import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { themeMUI } from '~/config';
import { IOnlyChildren } from '~/types/props';

export const metadata: Metadata = {
    title: 'Management | Laptop store',
    description: 'Management page',
};

export default function RootLayout({ children }: IOnlyChildren) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true}>
                <ThemeProvider theme={themeMUI}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
