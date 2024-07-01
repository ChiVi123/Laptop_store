'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import createAppSlice from '../create.app.slice';

const initialState: { value: number } = { value: 0 };
const cartSlice = createAppSlice({
    name: 'cart',
    initialState,
    reducers: (creators) => ({
        setCartSize: creators.reducer((state, { payload }: PayloadAction<number>) => {
            state.value = payload;
        }),
        resetCartSize: creators.reducer((state) => {
            state.value = 0;
        }),
    }),
    selectors: {
        selectCartSize: (state) => state.value,
    },
});
export default cartSlice;
