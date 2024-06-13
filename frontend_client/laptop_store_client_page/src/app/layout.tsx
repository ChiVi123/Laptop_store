import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { BottomNavigation, Container, Header } from '~/components';
import { Toaster } from '~/components/ui/sonner';
import ReduxProvider from '~/provider/redux.provider';

async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang='vi'>
            <body className='bg-cv-primary-background'>
                <Toaster />
                <ReduxProvider>
                    <Header />
                    <Container component='main' className='p-0 pt-[3.875rem] pb-8 md:px-4 md:py-[4.625rem]'>
                        {children}
                    </Container>
                    <BottomNavigation />
                </ReduxProvider>
                <footer className='hidden lg:block'>Footer</footer>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store',
    description: 'Laptop Store',
};

export default RootLayout;
