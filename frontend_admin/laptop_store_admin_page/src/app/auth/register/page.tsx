'use client';

import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { Fragment, HTMLInputTypeAttribute, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { registerAction } from '~/actions/authActions';
import { EPath } from '~/common/enums';
import { registerDefaultValues } from '~/common/values';
import { StyleContainer, StyleField, StyleLabel, StyleLink } from '~/components/auth/styles';
import { registerResolver } from '~/resolvers';
import { registerFormData } from '~/types/form.data';

interface Field {
    id: string;
    name: keyof registerFormData;
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
    } = useForm<registerFormData>({
        resolver: registerResolver,
        defaultValues: registerDefaultValues,
    });
    const router = useRouter();
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleOnSubmit: SubmitHandler<registerFormData> = async (data) => {
        setDisabled(true);
        const result = await registerAction(data);

        if (result?.success) {
            router.push(EPath.AUTH_NOTIFY_SEND_MAIL.concat('?variant=verify'));
        }

        setDisabled(false);
    };

    function renderField(field: Field): React.ReactNode {
        return (
            <StyleField>
                <StyleLabel htmlFor={field.id}>{field.label}</StyleLabel>
                <Box ml='auto'>
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

                <Button type='submit' variant='contained' disabled={disabled} sx={{ width: 380, ml: 'auto' }}>
                    Đăng ký
                </Button>
            </Box>

            <Box sx={{ width: 380, ml: 'auto' }}>
                <Typography variant='body2' component='span'>
                    Đã có tài khoản?{' '}
                </Typography>
                <StyleLink href={EPath.AUTH_LOGIN}>Trở về trang đăng nhập</StyleLink>
            </Box>
        </StyleContainer>
    );
}

export default RegisterPage;
