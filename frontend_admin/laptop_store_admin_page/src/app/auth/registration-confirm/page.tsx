'use client';

import { useEffect, useRef } from 'react';
import { authServerAction } from '~/actions';
import { StyleContainer } from '~/components/auth/styles';
import logger from '~/libs/logger';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

function RegistrationConfirmPage({ searchParams }: IProps) {
    const ignoreRef = useRef<boolean>(false);

    useEffect(() => {
        async function fetchApi(token: string) {
            const result = await authServerAction.verifyByToken(token);
            logger.info('registration confirm::', result);
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
