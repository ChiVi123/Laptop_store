'use client';

import { PayloadAction } from '@reduxjs/toolkit';
import { IAccountToken } from '~/types/models';
import createAppSlice from '../create.app.slice';

const initialState: IAccountToken = { accessToken: '', expiration: 0, refreshToken: '' };

const accountTokenSlice = createAppSlice({
    name: 'accountToken',
    initialState,
    reducers: (creators) => ({
        setAccountToken: creators.reducer((state, { payload }: PayloadAction<IAccountToken>) => {
            Object.assign(state, payload);
        }),
        resetAccountToken: creators.reducer((state) => {
            Object.assign(state, initialState);
        }),
    }),
    selectors: {
        selectAccountToken: (state) => state,
    },
});
export default accountTokenSlice;
