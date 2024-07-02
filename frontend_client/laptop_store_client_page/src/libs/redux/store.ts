'use client';

import { combineSlices, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { categoryServerAction } from '~/actions';

import { loadState } from '../helper';
import logger from '../logger';

import { categoryActions } from './features';
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

const addListener = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>();

addListener({
    predicate: (_action, current) => current.category.default.id === 0,
    effect: async (_action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        const node = await categoryServerAction.getRoot();
        listenerApi.dispatch(categoryActions.update(node));
        logger.info('listenerMiddleware:: update category');
    },
});
