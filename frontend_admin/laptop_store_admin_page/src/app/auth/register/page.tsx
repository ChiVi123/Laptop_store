import { Box, Button, Typography } from '@mui/material';
import React, { Fragment, HTMLInputTypeAttribute } from 'react';
import {
    StyleButtonSend,
    StyleContainer,
    StyleField,
    StyleInput,
    StyleInputSend,
    StyleLabel,
    StyleLink,
} from '~/components/auth.styles';

interface Field {
    id: string;
    name: string;
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
    function renderField(field: Field): React.ReactNode {
        return (
            <StyleField>
                <StyleLabel htmlFor={field.id}>{field.label}</StyleLabel>
                {field.type !== 'email' ? (
                    <StyleInput
                        id={field.id}
                        name={field.name}
                        label=''
                        type={field.type}
                        placeholder={field.placeholder}
                        size='small'
                        autoComplete='off'
                    />
                ) : (
                    <Box display='flex' width={380} ml='auto'>
                        <StyleInputSend
                            id={field.id}
                            name={field.name}
                            label=''
                            type={field.type}
                            placeholder={field.placeholder}
                            size='small'
                            autoComplete='off'
                        />
                        <StyleButtonSend variant='contained' size='small'>
                            Gửi mã xác thực
                        </StyleButtonSend>
                    </Box>
                )}
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
            >
                {fields.map((item) => (
                    <Fragment key={item.id}>{renderField(item)}</Fragment>
                ))}

                <Button variant='contained' sx={{ width: 380, ml: 'auto' }}>
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
