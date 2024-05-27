'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import createAppSlice from '../create.app.slice';

const initialState: { value: number } = { value: 0 };

const cartSlice = createAppSlice({
    name: 'cart',
    initialState,
    reducers: (creators) => ({
        update: creators.reducer((state, { payload }: PayloadAction<number>) => {
            state.value = payload;
        }),
    }),
    selectors: {
        selectSize: (state) => state.value,
    },
});
export default cartSlice;
