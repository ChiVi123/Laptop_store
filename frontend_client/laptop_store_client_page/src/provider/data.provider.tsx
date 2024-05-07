'use client';

import { PropsWithChildren } from 'react';
import { DataContext } from '~/context';
import { DataContextType } from '~/types/contexts';

function DataProvider({ children, categories, account }: PropsWithChildren<DataContextType>) {
    return <DataContext.Provider value={{ categories, account }}>{children}</DataContext.Provider>;
}

export default DataProvider;
