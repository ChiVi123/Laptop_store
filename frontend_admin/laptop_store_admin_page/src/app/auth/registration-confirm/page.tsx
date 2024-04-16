'use client';

import { useEffect, useRef } from 'react';
import { StyleContainer } from '~/components/auth/styles';
import logResultError from '~/libs/log.result.error';
import { authService } from '~/services';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

function RegistrationConfirmPage({ searchParams }: IProps) {
    const ignoreRef = useRef<boolean>(false);

    useEffect(() => {
        async function fetchApi(token: string) {
            const result = await authService.verifyByToken(token);
            if ('error' in result) {
                logResultError('Registration error::', result);
            }
        }

        if (searchParams.token && ignoreRef.current) {
            fetchApi(searchParams.token);
        }

        return () => {
            ignoreRef.current = true;
        };
    }, [searchParams.token]);

    return <StyleContainer sx={{ width: 320 }}>Xác thự email</StyleContainer>;
}

export default RegistrationConfirmPage;
