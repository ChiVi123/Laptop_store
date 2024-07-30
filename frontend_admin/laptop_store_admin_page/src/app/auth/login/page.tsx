'use client';

import { Google as Google_icon } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { authServerAction } from '~/actions';
import { EPath } from '~/common/enums';
import { loginDefaultValues } from '~/common/values';
import PasswordField from '~/components/auth/password.field';
import { StyleButtonLoginWithGoogle, StyleContainer, StyleLine, StyleLink } from '~/components/auth/styles';
import { loginResolver } from '~/resolvers';
import { loginFormData } from '~/types/form.data';

function LoginPage() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<loginFormData>({ resolver: loginResolver, defaultValues: loginDefaultValues });
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleOnSubmit: SubmitHandler<loginFormData> = async (data) => {
        setDisabled(true);
        await authServerAction.login(data);
        setDisabled(false);
    };

    return (
        <StyleContainer elevation={3} sx={{ width: 420 }}>
            <Box display='flex' columnGap={2}>
                <Image src='/logo-icon.png' alt='logo' width={48} height={48} />
                <Box>
                    <Typography variant='h1'>Đăng nhập</Typography>
                    <Typography variant='body2' component='span'>
                        Bạn chưa có tài khoản?{' '}
                    </Typography>
                    <StyleLink href={EPath.AUTH_REGISTER}>Đăng ký</StyleLink>
                </Box>
            </Box>

            <Box
                component='form'
                mt={1}
                sx={{
                    '& .MuiFormControl-root': { my: 1 },
                    '& .MuiInputBase-input': { p: 1 },
                }}
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id='email'
                            name='email'
                            label='Email'
                            type='email'
                            size='small'
                            autoComplete='off'
                            fullWidth
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PasswordField
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />

                <Box mb={4}>
                    <Typography variant='body2' component='span'>
                        Quên mật khẩu? Nhấn vào đây{' '}
                    </Typography>
                    <StyleLink href={EPath.AUTH_FORGOT_PASSWORD}>đây</StyleLink>
                </Box>

                <Button type='submit' variant='contained' fullWidth disabled={disabled}>
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

            <Box display='flex' justifyContent='center' columnGap={1}>
                <StyleButtonLoginWithGoogle variant='contained'>
                    <Google_icon sx={{ fontSize: '1rem' }} />
                    Google
                </StyleButtonLoginWithGoogle>
            </Box>
        </StyleContainer>
    );
}

export default LoginPage;
