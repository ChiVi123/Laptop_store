'use client';

import { useEffect, useRef } from 'react';
import { StyleContainer } from '~/components/auth/styles';
import { authService } from '~/services';
import { logger, parseError } from '~/utils';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

function RegistrationConfirmPage({ searchParams }: IProps) {
    const ignoreRef = useRef<boolean>(false);

    useEffect(() => {
        async function fetchApi(token: string) {
            const result = await authService.verifyByToken(token);
            if (result) {
                logger({ error: parseError(result) });
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
