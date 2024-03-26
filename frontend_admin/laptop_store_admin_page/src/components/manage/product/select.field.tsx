'use client';

import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface IProps {
    id: string;
    placeholder: string;
    items: any[];
    value?: string;
    optionKeyValue: string;
    optionKeyLabel: string;
    error: boolean;
    helperText: string;
    onChange?: (value: string) => void;
}

function SelectField({
    id,
    placeholder,
    items,
    value,
    optionKeyValue,
    optionKeyLabel,
    error,
    helperText,
    onChange,
}: IProps) {
    const [selected, setSelected] = useState<string>(value || '');

    function handleSelect(event: SelectChangeEvent) {
        setSelected(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <FormControl size='small' fullWidth error={error}>
            <Select
                id={'select-' + id}
                value={selected}
                displayEmpty
                error={error}
                inputProps={{ id }}
                sx={{ '& em': { color: ({ palette }) => palette.action.disabled } }}
                onChange={handleSelect}
            >
                <MenuItem value=''>
                    <em>{placeholder}</em>
                </MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.id} value={item[optionKeyValue]}>
                        {item[optionKeyLabel]}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default SelectField;
