import './globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { Toaster } from '~/components/ui/sonner';
import ReduxProvider from '~/provider/redux.provider';
import { getRootCategory } from '~/services';

async function RootLayout({ children }: PropsWithChildren) {
    const rootCategory = await getRootCategory();
    return (
        <html lang='vi'>
            <body className='bg-cv-primary-background'>
                <Toaster />
                <ReduxProvider rootCategory={rootCategory}>{children}</ReduxProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store',
    description: 'Laptop Store',
};

export default RootLayout;
