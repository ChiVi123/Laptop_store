'use client';

import { PropsWithChildren } from 'react';
import { AccountContext } from '~/config';
import { IAccount } from '~/types/models';

export function AccountProvider({ children, account }: PropsWithChildren<{ account: IAccount | null }>) {
    return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
