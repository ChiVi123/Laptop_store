import { Google as Google_icon } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import PasswordField from '~/components/auth.password';
import {
    StyleButtonLoginWithGoogle,
    StyleContainer,
    StyleLine,
    StyleLink,
} from '~/components/auth.styles';

function LoginPage() {
    return (
        <StyleContainer elevation={3} sx={{ width: 420 }}>
            <Box sx={{ display: 'flex', columnGap: 2 }}>
                <Image src='/logo-icon.png' alt='logo' width={48} height={48} />
                <Box>
                    <Typography variant='h1'>Đăng nhập</Typography>
                    <Typography variant='body2' component='span'>
                        Bạn chưa có tài khoản?{' '}
                    </Typography>
                    <StyleLink href='/auth/register'>Đăng ký</StyleLink>
                </Box>
            </Box>

            <Box
                component='form'
                mt={1}
                sx={{
                    '& .MuiFormControl-root': { my: 1 },
                    '& .MuiInputBase-input': { p: 1 },
                }}
            >
                <TextField
                    id='email'
                    name='email'
                    label='Email'
                    type='email'
                    size='small'
                    autoComplete='off'
                    fullWidth
                />
                <PasswordField />

                <Box sx={{ mb: 4 }}>
                    <Typography variant='body2' component='span'>
                        Quên mật khẩu? Nhấn vào đây{' '}
                    </Typography>
                    <StyleLink href='/auth/forgot-password'>đây</StyleLink>
                </Box>

                <Button variant='contained' fullWidth>
                    Đăng nhập
                </Button>
            </Box>

            <Box position='relative' height='21px' mt={2} mb={3}>
                <StyleLine />
                <Typography
                    variant='body2'
                    position='absolute'
                    display='inline-block'
                    left='50%'
                    px={2.5}
                    zIndex={2}
                    component='span'
                    sx={{
                        transform: 'translateX(-50%)',
                        backgroundColor: 'white',
                    }}
                >
                    Hoặc đăng nhập bằng
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: 1 }}>
                <StyleButtonLoginWithGoogle variant='contained'>
                    <Google_icon sx={{ fontSize: '1rem' }} />
                    Google
                </StyleButtonLoginWithGoogle>
            </Box>
        </StyleContainer>
    );
}

export default LoginPage;
