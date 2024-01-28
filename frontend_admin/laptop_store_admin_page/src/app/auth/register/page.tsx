'use client';

import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import React, { Fragment, HTMLInputTypeAttribute } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerDefaultValues } from '~/common/values';
import {
    StyleButtonSend,
    StyleContainer,
    StyleField,
    StyleInputSend,
    StyleLabel,
    StyleLink,
} from '~/components/auth.styles';
import { registerResolver } from '~/resolvers';
import { TRegisterFormData } from '~/types/form.data';
import { logger } from '~/utils';

interface Field {
    id: string;
    name: keyof TRegisterFormData;
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
}

const fields: Field[] = [
    {
        id: 'fullName',
        name: 'fullName',
        label: 'Họ và tên',
        type: 'text',
        placeholder: 'Nhập họ tên...',
    },
    {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Nhập Email...',
    },
    {
        id: 'otp',
        name: 'otp',
        label: 'Mã xác thực',
        type: 'text',
        placeholder: 'Nhập mã xác thực gửi tới email trên',
    },
    {
        id: 'password',
        name: 'password',
        label: 'Mật khẩu',
        type: 'password',
        placeholder: 'Nhập mật khẩu...',
    },
    {
        id: 'passwordConfirm',
        name: 'passwordConfirm',
        label: 'Xác nhận mật khẩu',
        type: 'password',
        placeholder: 'Nhập lại mật khẩu...',
    },
];

function RegisterPage() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<TRegisterFormData>({
        resolver: registerResolver,
        defaultValues: registerDefaultValues,
    });

    function handleOnSubmit(data: TRegisterFormData) {
        logger(handleOnSubmit.name, data);
    }

    function renderField(field: Field): React.ReactNode {
        return (
            <StyleField>
                <StyleLabel htmlFor={field.id}>{field.label}</StyleLabel>
                <Box ml='auto'>
                    {field.type !== 'email' ? (
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    id={field.id}
                                    name={field.name}
                                    label=''
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    size='small'
                                    autoComplete='off'
                                    error={Boolean(errors[field.name]?.message)}
                                    value={value}
                                    onChange={onChange}
                                    sx={{ width: 380 }}
                                />
                            )}
                        />
                    ) : (
                        <Box display='flex' width={380} ml='auto'>
                            <Controller
                                control={control}
                                name={field.name}
                                render={({ field: { onChange, value } }) => (
                                    <StyleInputSend
                                        id={field.id}
                                        name={field.name}
                                        label=''
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        size='small'
                                        autoComplete='off'
                                        error={Boolean(errors[field.name]?.message)}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <StyleButtonSend variant='contained' size='small'>
                                Gửi mã xác thực
                            </StyleButtonSend>
                        </Box>
                    )}
                    <FormHelperText error={Boolean(errors[field.name]?.message)} sx={{ pl: 1 }}>
                        {errors[field.name]?.message}
                    </FormHelperText>
                </Box>
            </StyleField>
        );
    }
    return (
        <StyleContainer elevation={3} sx={{ width: 580 }}>
            <Typography variant='h1' width='100%' mb={2}>
                Đăng ký
            </Typography>

            <Box
                component='form'
                display='flex'
                flexDirection='column'
                gap={2}
                mb={2}
                sx={{ '& .MuiInputBase-input': { p: 1 } }}
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                {fields.map((item) => (
                    <Fragment key={item.id}>{renderField(item)}</Fragment>
                ))}

                <Button type='submit' variant='contained' sx={{ width: 380, ml: 'auto' }}>
                    Đăng ký
                </Button>
            </Box>

            <Box sx={{ width: 380, ml: 'auto' }}>
                <Typography variant='body2' component='span'>
                    Đã có tài khoản?{' '}
                </Typography>
                <StyleLink href='/auth/login'>Trở về trang đăng nhập</StyleLink>
            </Box>
        </StyleContainer>
    );
}

export default RegisterPage;
