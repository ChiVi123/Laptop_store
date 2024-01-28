'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { ChangeEventHandler, MouseEvent, useState } from 'react';

interface IProps {
    error: boolean;
    helperText: string | undefined;
    value: unknown;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function PasswordField({ error, helperText, value, onChange }: IProps) {
    const [showed, setShowed] = useState<boolean>(false);

    function handleClick(event: MouseEvent) {
        event.preventDefault();
        setShowed((prev) => !prev);
    }

    return (
        <FormControl variant='outlined' size='small' fullWidth error={error}>
            <InputLabel htmlFor='auth-password' size='small' error={error}>
                Mật khẩu
            </InputLabel>
            <OutlinedInput
                id='auth-password'
                name='password'
                type={showed ? 'text' : 'password'}
                size='small'
                label='Mật khẩu'
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClick}>
                            {showed ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                value={value}
                error={error}
                onChange={onChange}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;
