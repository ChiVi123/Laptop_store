'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import { cartServerAction } from '~/actions';
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
        setCartSizeAsync: creators.asyncThunk(
            async () => {
                const response = await cartServerAction.getCart();
                return response.length;
            },
            {
                pending: (_state) => {},
                fulfilled: (state, { payload }) => {
                    state.value = payload;
                },
                rejected: (_state) => {},
            },
        ),
    }),
    selectors: {
        selectCartSize: (state) => state.value,
    },
});
export default cartSlice;
