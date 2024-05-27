'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import { Key } from '~/common/enums';
import { IAccount } from '~/types/models';

import createAppSlice from '../create.app.slice';

type State = { value: IAccount | null };
const storage = {
    setValue: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getValue: (key: string): IAccount | null => JSON.parse(localStorage.getItem(key) ?? 'null'),
};
const accountSlice = createAppSlice({
    name: 'account',
    initialState: (): State => {
        const value = storage.getValue(Key.ACCOUNT);
        return { value };
    },
    reducers: (creators) => ({
        update: creators.reducer((state, { payload }: PayloadAction<IAccount>) => {
            state.value = payload;
            storage.setValue(Key.ACCOUNT, payload);
        }),
        logout: creators.reducer((state) => {
            state.value = null;
            storage.setValue(Key.ACCOUNT, null);
        }),
    }),
    selectors: {
        selectAccount: (state) => state.value,
    },
});
export default accountSlice;
