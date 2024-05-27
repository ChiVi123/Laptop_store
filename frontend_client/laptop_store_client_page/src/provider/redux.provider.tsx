'use client';

import { setupListeners } from '@reduxjs/toolkit/query';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from '~/libs/redux/store';

function ReduxProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<AppStore | null>(null);

    if (storeRef.current === null) {
        storeRef.current = makeStore();
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
