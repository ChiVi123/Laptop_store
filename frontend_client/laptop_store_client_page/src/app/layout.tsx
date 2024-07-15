import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';

import './globals.css';

import { Key } from '~/common/enums';
import { Toaster } from '~/components/ui/sonner';
import ReduxProvider from '~/provider/redux.provider';
import { getRootCategory } from '~/services';

globalThis.nextOrigin = `${headers().get(Key.X_FORWARDED_PROTO)}://${headers().get(Key.X_FORWARDED_HOST)}`;

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
