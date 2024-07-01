'use client';

import { PayloadAction } from '@reduxjs/toolkit';

import { RAW_CATEGORY_NODE } from '~/common/values';
import { ICategoryNode } from '~/types/models';
import { ICategoryState } from '~/types/redux';

import createAppSlice from '../create.app.slice';

const initialState: ICategoryState = { default: RAW_CATEGORY_NODE, status: 'pending' };

const categorySlice = createAppSlice({
    name: 'category',
    initialState,
    reducers: (creators) => ({
        update: creators.reducer((state, { payload }: PayloadAction<ICategoryNode>) => {
            state.default = payload.children[0];
            state.status = 'fulfilled';
        }),
    }),
    selectors: {
        selectDefault: (state) => state.default,
    },
});
export default categorySlice;
