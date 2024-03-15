'use client';

import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createBrandAction } from '~/actions/brandActions';
import { uploadSingleImageAction } from '~/actions/uploadActions';
import { EKeys, EStatus } from '~/common/enums';
import { addBrandResolver } from '~/resolvers';
import { addBrandFormData } from '~/types/form.data';
import { logger } from '~/utils';
import FormLabel from '../form.label';
import SingleImageField from '../single.image.field';

function BrandForm() {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<addBrandFormData>({ resolver: addBrandResolver, defaultValues: { name: '' } });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(true);

    const handleOnSubmit: SubmitHandler<addBrandFormData> = async (data) => {
        setLoading(true);
        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;
        if (data.logo && data.logo instanceof File) {
            const formData = new FormData();
            formData.set(EKeys.LOGO, data.logo);
            data.logo = await uploadSingleImageAction(formData);
        }

        const result = await createBrandAction(data);
        logger({ result });

        setLoading(false);
    };

    return (
        <Paper
            component='form'
            elevation={0}
            sx={{ p: 3, mt: 3, mx: 10, '& > div:not(:last-of-type)': { mb: 3 } }}
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <div>
                <FormLabel id='input-name' required>
                    Tên thương hiệu
                </FormLabel>
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { value, onChange } }) => (
                        <TextField
                            id='input-name'
                            type='text'
                            label=''
                            placeholder='Nhập tên thương hiệu...'
                            autoComplete='on'
                            size='small'
                            fullWidth
                            error={Boolean(errors.name?.message)}
                            helperText={errors.name?.message}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </div>

            <div>
                <Controller
                    control={control}
                    name='logo'
                    render={({ field: { onChange } }) => <SingleImageField onChange={onChange} />}
                />
                <FormHelperText error={Boolean(errors.logo?.message)}>{errors.logo?.message}</FormHelperText>
            </div>

            <div>
                <FormControlLabel
                    label='Bật'
                    control={
                        <Switch
                            inputProps={{ 'aria-label': 'brand-status' }}
                            checked={status}
                            onChange={(event) => setStatus(event.target.checked)}
                        />
                    }
                />
            </div>

            <Box display='flex' justifyContent='flex-end'>
                <Button type='submit' variant='contained' disabled={loading}>
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

export default BrandForm;
