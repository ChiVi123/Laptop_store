'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EPath } from '~/common/enums';
import { StyleContainer, StyleLink } from '~/components/auth/styles';
import logResultError from '~/libs/log.result.error';
import { sendMailResolver } from '~/resolvers';
import { authService } from '~/services';
import { sendMailFormData } from '~/types/form.data';

function SendEmailVerifyPage() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<sendMailFormData>({
        resolver: sendMailResolver,
        defaultValues: { email: '' },
    });
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleOnSubmit: SubmitHandler<sendMailFormData> = async (data) => {
        setDisabled(true);
        const result = await authService.sendEmailVerify(data.email);
        if ('error' in result) {
            logResultError('Send mail verify error::', result);
            setDisabled(false);
        }
    };

    return (
        <StyleContainer elevation={3} sx={{ width: 380 }}>
            <Typography variant='h1'>Gửi mã xác nhận</Typography>
            <Typography mt={1} sx={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.2 }}>
                Vui lòng cung cấp email đăng nhập
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
                    Gửi
                </Button>
            </Box>
            <Box display='flex' justifyContent='center' mt={2}>
                <StyleLink href={EPath.AUTH_LOGIN}>Trở về trang đăng nhập</StyleLink>
            </Box>
        </StyleContainer>
    );
}

export default SendEmailVerifyPage;
