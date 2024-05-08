'use client';

import { createContext } from 'react';
import { DataContextType } from './types/contexts';

const initDataContext: DataContextType = {
    categories: new Array(),
    account: undefined,
};

export const DataContext = createContext<DataContextType>(initDataContext);
