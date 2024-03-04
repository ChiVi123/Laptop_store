'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { verifyTokenAction } from '~/actions/authActions';
import { EPath } from '~/common/enums';
import { StyleContainer } from '~/components/auth/styles';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

function RegistrationConfirmPage({ searchParams }: IProps) {
    const route = useRouter();
    const ignoreRef = useRef<boolean>(false);

    useEffect(() => {
        async function fetchApi(token: string) {
            const result = await verifyTokenAction(token);

            if (result?.success) {
                route.push(EPath.MANAGE_PRODUCT_LIST);
            } else {
                route.push(EPath.AUTH_SEND_MAIL_VERIFY);
            }
        }

        if (searchParams.token && ignoreRef.current) {
            fetchApi(searchParams.token);
        }

        return () => {
            ignoreRef.current = true;
        };
    }, [route, searchParams.token]);

    return <StyleContainer sx={{ width: 320 }}>Xác thự email</StyleContainer>;
}

export default RegistrationConfirmPage;
