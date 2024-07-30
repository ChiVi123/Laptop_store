'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiRequest } from '~/libs';
import { resetAccountToken, resetCartSize, selectAccountToken } from '~/libs/redux/features';
import { useAppDispatch, useAppSelector } from './redux';

type LogoutResponse = { message: string; success: boolean };

/**
 *
 * @returns {boolean} is token expired
 *
 */
export const useAuthenticated = (): boolean => {
    const accountToken = useAppSelector(selectAccountToken);
    const [isExpired, setIsExpired] = useState<boolean>(true);

    useEffect(() => {
        setIsExpired(!(accountToken.expiration >= Date.now()));
    }, [accountToken.expiration]);
    return isExpired;
};
export const useLogout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        const response = await apiRequest.get('api/logout', { baseURL: '' }).json<LogoutResponse>();
        if (response.success) {
            dispatch(resetAccountToken());
            dispatch(resetCartSize());
            router.push('/');
        }
    };
};
