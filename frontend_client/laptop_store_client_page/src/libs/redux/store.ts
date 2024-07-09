'use client';

import { combineSlices, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { loadState } from '../helper';

import accountTokenSlice from './features/account.token';
import cartSlice from './features/cart';
import categorySlice from './features/category';

const rootReducer = combineSlices(accountTokenSlice, cartSlice, categorySlice);
const listenerMiddleware = createListenerMiddleware();

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
        preloadedState: loadState(),
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
