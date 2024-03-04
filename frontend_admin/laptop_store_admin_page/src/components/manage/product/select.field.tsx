'use client';

import { FormControl, FormHelperText, MenuItem, SelectChangeEvent, Select as SelectMUI } from '@mui/material';
import { useState } from 'react';

interface IProps {
    id: string;
    placeholder: string;
    items: any[];
    value: string;
    content: string;
    error: boolean;
    helperText: string;
    onChange?: (value: string) => void;
}

function SelectField({ id, placeholder, items, value, content, error, helperText, onChange }: IProps) {
    const [selected, setSelected] = useState<string>('');

    function handleSelectCategory(event: SelectChangeEvent) {
        setSelected(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <FormControl size='small' fullWidth error={error}>
            <SelectMUI
                id={'select-' + id}
                value={selected}
                displayEmpty
                error={error}
                inputProps={{ id }}
                sx={{ '& em': { color: ({ palette }) => palette.action.disabled } }}
                onChange={handleSelectCategory}
            >
                <MenuItem value=''>
                    <em>{placeholder}</em>
                </MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.id} value={item[value]}>
                        {item[content]}
                    </MenuItem>
                ))}
            </SelectMUI>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default SelectField;
