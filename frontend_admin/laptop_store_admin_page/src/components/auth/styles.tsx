'use client';

import { Box, Button, Paper, TextField, styled } from '@mui/material';
import NextLink from 'next/link';

export const StyleWrap = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    paddingTop: 20,
    paddingBottom: 20,
    background: 'linear-gradient(180deg, #A1AEE7 0%, #F0F2F5 100%)',
}));
export const StyleLink = styled(NextLink)(({ theme: { palette } }) => ({
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.2,
    textDecoration: 'none',
    '&:active': {
        color: palette.primary.light,
    },
    '&:hover': {
        textDecoration: 'underline',
    },
}));
export const StyleContainer = styled(Paper)(() => ({
    padding: 24,
    backgroundColor: 'white',
}));
// Login
export const StyleButtonLoginWithGoogle = styled(Button)(({ theme: { palette } }) => ({
    columnGap: 6,
    minWidth: 120,
    padding: 8,
    backgroundColor: '#dd4b39',
    '&:hover': {
        backgroundColor: palette.augmentColor({ color: { main: '#dd4b39' } }).dark,
    },
}));
export const StyleLine = styled(Box)(({ theme: { palette } }) => ({
    position: 'absolute',
    width: '100%',
    height: '1px',
    inset: '50% 0',
    transform: 'translateY(-50%)',
    backgroundColor: palette.border.main,
    zIndex: 1,
}));
// Register
export const StyleField = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));
export const StyleLabel = styled('label')(({ theme: { palette } }) => ({
    color: palette.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.2,
}));
export const StyleInputSend = styled(TextField)(() => ({
    flex: 1,
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '4px 0 0 4px',
    },
}));
export const StyleButtonSend = styled(Button)(() => ({
    p: 1,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.2,
    borderRadius: '0 4px 4px 0',
}));
