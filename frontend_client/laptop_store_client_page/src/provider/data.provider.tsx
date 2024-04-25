'use client';

import { PropsWithChildren } from 'react';
import { DataContext } from '~/context';
import { IAccount, ICategory } from '~/types/models';

interface IProps {
    categories: ICategory[];
    account: IAccount | undefined;
}

function DataProvider({ children, categories, account }: PropsWithChildren<IProps>) {
    return <DataContext.Provider value={{ categories, account }}>{children}</DataContext.Provider>;
}

export default DataProvider;
