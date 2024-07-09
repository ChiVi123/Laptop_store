'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import debounce from 'debounce';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { saveState } from '~/libs/helper';
import { setDefaultCategory } from '~/libs/redux/features';
import { AppStore, RootState, makeStore } from '~/libs/redux/store';
import { ICategoryNode } from '~/types/models';

function ReduxProvider({ children, rootCategory }: PropsWithChildren<{ rootCategory: ICategoryNode }>) {
    const storeRef = useRef<AppStore | null>(null);

    if (storeRef.current === null) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(setDefaultCategory(rootCategory));
        storeRef.current.subscribe(
            debounce(() => {
                if (storeRef.current?.getState()) {
                    saveState<RootState>(storeRef.current.getState(), ['category']);
                }
            }, 800),
        );
    }

    useEffect(() => {
        if (storeRef.current !== null) {
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}

export default ReduxProvider;
