'use client';

import { Box } from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from '~/config';

function FormAccount() {
    const account = useContext(AccountContext);

    return (
        <Box mt={3} px={3}>
            <p>{account?.fullName}</p>
            <p>{account?.email}</p>
            <p>{account?.role}</p>
        </Box>
    );
}

export default FormAccount;
