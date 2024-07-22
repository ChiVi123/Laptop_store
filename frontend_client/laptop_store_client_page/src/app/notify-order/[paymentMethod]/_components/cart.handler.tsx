'use client';

import { Fragment, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '~/hooks/redux';
import { setCartSizeAsync } from '~/libs/redux/features';

function CartHandler({ children, success }: PropsWithChildren<{ success: boolean }>) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (success) {
            dispatch(setCartSizeAsync());
        }
    }, [dispatch, success]);

    return <Fragment>{children}</Fragment>;
}

export default CartHandler;
