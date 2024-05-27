import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { Container, Header } from '~/components';
import { Toaster } from '~/components/ui/sonner';
import ReduxProvider from '~/provider/redux.provider';

async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang='vi'>
            <body className='bg-cv-primary-background'>
                <Toaster />
                <ReduxProvider>
                    <Header />
                    <Container component='main' className='py-[4.625rem]'>
                        {children}
                    </Container>
                </ReduxProvider>
                <footer>Footer</footer>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store',
    description: 'Laptop Store',
};

export default RootLayout;
