import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { themeMUI } from '~/config';

export const metadata: Metadata = {
    title: 'Management | Laptop store',
    description: 'Management page',
};

export default function RootLayout({ children }: PropsWithChildren) {
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
