'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EPath } from '~/common/enums';
import httpRequest from '~/libs/http.request';
import { logger } from '~/utils';

type responseType = {
    message: string;
    path: EPath;
};

function Error({ error }: { error: Error }) {
    const router = useRouter();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async function () {
            const result = await httpRequest.get<responseType>('/api/auth/logout', { baseUrl: '', signal });
            router.push(result.path);
            logger({ result });
        })();

        return () => {
            controller.abort();
        };
    }, [router]);

    return <div>{error.message}</div>;
}

export default Error;
