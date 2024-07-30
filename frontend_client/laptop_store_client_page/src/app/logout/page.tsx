'use client';

import { useEffect } from 'react';
import { useLogout } from '~/hooks/auth';

function LogoutPage() {
    const logout = useLogout();
    useEffect(() => {
        logout();
    }, [logout]);
    return <div>Logout page</div>;
}

export default LogoutPage;
