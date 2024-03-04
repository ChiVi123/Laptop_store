'use client';

import { TextField } from '@mui/material';
import { WheelEvent } from 'react';

interface IProps {
    id: string;
    placeholder: string;
    error: boolean;
    helperText: string | undefined;
    value: unknown;
    onChange: (...event: any[]) => void;
}

function NumberField({ id, placeholder, error, helperText, value, onChange }: IProps) {
    function handleScroll({ target }: WheelEvent<HTMLInputElement>) {
        if ('blur' in target && typeof target.blur === 'function') {
            target.blur();
        }
    }
    return (
        <TextField
            id={id}
            type='number'
            label=''
            placeholder={placeholder}
            autoComplete='off'
            size='small'
            fullWidth
            error={error}
            helperText={helperText}
            value={value}
            onChange={onChange}
            inputProps={{ onWheel: handleScroll }}
        />
    );
}

export default NumberField;
