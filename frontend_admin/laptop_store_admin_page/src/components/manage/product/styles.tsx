'use client';

import { Box, alpha, styled } from '@mui/material';

export const StyleBackgroundFormGroup = styled(Box)(({ theme: { palette } }) => ({
    padding: 8,
    borderRadius: 4,
    backgroundColor: alpha(palette.primary.main, 0.1),
}));
