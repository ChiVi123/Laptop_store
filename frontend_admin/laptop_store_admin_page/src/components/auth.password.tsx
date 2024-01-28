'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MouseEvent, useState } from 'react';

function PasswordField() {
    const [showed, setShowed] = useState<boolean>(false);
    function handleClick(event: MouseEvent) {
        event.preventDefault();
        setShowed((prev) => !prev);
    }

    return (
        <FormControl variant='outlined' size='small' fullWidth>
            <InputLabel htmlFor='auth-password' size='small'>
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
            />
        </FormControl>
    );
}

export default PasswordField;
