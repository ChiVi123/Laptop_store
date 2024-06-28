'use client';

import { accountActions, accountSelectors, cartActions, cartSelectors } from '~/libs/redux/features';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Key } from '~/common/enums';
import { apiRequest } from '~/libs';
import { storage } from '~/libs/utilities';
import { IAccount } from '~/types/models';
import { useAppDispatch, useAppSelector } from './redux';

export const useAuth = () => {
    const account = useAppSelector(accountSelectors.selectAccount);
    const cartSize = useAppSelector(cartSelectors.selectSize);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const localAccount = storage.get<IAccount | null>(Key.ACCOUNT, 'null');
        const localCartSize = storage.get<number>(Key.CART, '0');
        dispatch(accountActions.update(localAccount));
        dispatch(cartActions.update(localCartSize));
    }, [dispatch]);

    return { account, cartSize };
};
export const useLogout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return async () => {
        const response = await apiRequest
            .get('api/logout', { baseURL: '' })
            .json<{ message: string; success: boolean }>();
        if (response.success) {
            dispatch(accountActions.logout());
            dispatch(cartActions.reset());
            storage.set(Key.ACCOUNT, null);
            storage.set(Key.CART, 0);
            router.push('/');
        }
    };
};
