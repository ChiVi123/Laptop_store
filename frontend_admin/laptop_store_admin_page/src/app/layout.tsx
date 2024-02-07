import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { ThemeMUIProvider } from '~/providers';
import { IOnlyChildren } from '~/types/props';

export const metadata: Metadata = {
    title: 'Management | Laptop store',
    description: 'Management page',
};

export default function RootLayout({ children }: IOnlyChildren) {
    return (
        <html lang='vi'>
            <body suppressHydrationWarning={true}>
                <ThemeMUIProvider>
                    <CssBaseline />
                    {children}
                </ThemeMUIProvider>
            </body>
        </html>
    );
}
