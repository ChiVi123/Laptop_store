import { Box, Button, TextField, Typography } from '@mui/material';
import { StyleContainer, StyleLink } from '~/components/auth.styles';

function ForgotPasswordPage() {
    return (
        <StyleContainer elevation={3} sx={{ width: 380 }}>
            <Typography variant='h1'>Quên mật khẩu</Typography>
            <Typography mt={1} sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.2 }}>
                Vui lòng cung cấp email đăng nhập để lấy lại mật khẩu
            </Typography>

            <Box component='form' mt={2} sx={{ '& .MuiInputBase-input': { p: 1 } }}>
                <TextField
                    id='email'
                    name='email'
                    label=''
                    type='email'
                    placeholder='Nhập Email...'
                    size='small'
                    autoComplete='off'
                    fullWidth
                />

                <Button variant='contained' fullWidth sx={{ mt: 1 }}>
                    Đặt lại mật khẩu
                </Button>
            </Box>
            <Box display='flex' justifyContent='center' mt={2}>
                <StyleLink href='/auth/login'>Trở về trang đăng nhập</StyleLink>
            </Box>
        </StyleContainer>
    );
}

export default ForgotPasswordPage;
