'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { authServerAction } from '~/actions';
import { EPath } from '~/common/enums';
import { StyleContainer, StyleLink } from '~/components/auth/styles';
import logger from '~/libs/logger';
import { sendMailResolver } from '~/resolvers';
import { sendMailFormData } from '~/types/form.data';

function ForgotPasswordPage() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<sendMailFormData>({
        resolver: sendMailResolver,
        defaultValues: { email: '' },
    });
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleOnSubmit: SubmitHandler<sendMailFormData> = async ({ email }) => {
        setDisabled(true);
        const result = await authServerAction.sendEmailResetPassword(email);
        logger.info('forgot password::', result);
        setDisabled(false);
    };

    return (
        <StyleContainer elevation={3} sx={{ width: 380 }}>
            <Typography variant='h1'>Quên mật khẩu</Typography>
            <Typography mt={1} sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.2 }}>
                Vui lòng cung cấp email đăng nhập để lấy lại mật khẩu
            </Typography>

            <Box
                component='form'
                mt={2}
                sx={{ '& .MuiInputBase-input': { p: 1 } }}
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id='email'
                            name='email'
                            label=''
                            type='email'
                            placeholder='Nhập Email...'
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

                <Button type='submit' variant='contained' disabled={disabled} fullWidth sx={{ mt: 1 }}>
                    Đặt lại mật khẩu
                </Button>
            </Box>
            <Box display='flex' justifyContent='center' mt={2}>
                <StyleLink href={EPath.AUTH_LOGIN}>Trở về trang đăng nhập</StyleLink>
            </Box>
        </StyleContainer>
    );
}

export default ForgotPasswordPage;
