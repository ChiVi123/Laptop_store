import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Container from '~/components/container';
import Header from '~/components/header';
import { Toaster } from '~/components/ui/sonner';
import DataProvider from '~/provider/data.provider';
import { getRootCategory } from '~/services/category';

async function RootLayout({ children }: PropsWithChildren) {
    const rootCategory = await getRootCategory();

    return (
        <html lang='vi'>
            <body className='bg-cv-primary-background'>
                <Toaster />
                <DataProvider categories={rootCategory.children} account={undefined}>
                    <Header />
                    <Container component='main' className='py-[4.625rem]'>
                        {children}
                    </Container>
                </DataProvider>
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
