'use client';

import { Box } from '@mui/material';

function Error({ error }: { error: Error }) {
    return <Box p='16px 24px 18px'>{error.message}</Box>;
}

export default Error;
