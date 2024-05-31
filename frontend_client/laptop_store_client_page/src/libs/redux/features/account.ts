'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import { IAccount } from '~/types/models';

import createAppSlice from '../create.app.slice';

type State = { value: IAccount | null };

const initialState: State = { value: null };
const accountSlice = createAppSlice({
    name: 'account',
    initialState,
    reducers: (creators) => ({
        update: creators.reducer((state, { payload }: PayloadAction<IAccount | null>) => {
            state.value = payload;
        }),
        logout: creators.reducer((state) => {
            state.value = null;
        }),
    }),
    selectors: {
        selectAccount: (state) => state.value,
    },
});
export default accountSlice;
