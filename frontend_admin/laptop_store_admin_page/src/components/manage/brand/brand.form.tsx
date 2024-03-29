'use client';

import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { brandResolver } from '~/resolvers';
import { brandService, uploadFileService } from '~/services';
import { brandFormData } from '~/types/form.data';
import { IBrand } from '~/types/models';
import { logger, parseError } from '~/utils';
import FormLabel from '../form.label';
import SingleImageField, { imageType } from '../single.image.field';

interface IProps {
    brand?: IBrand;
}
function BrandForm({ brand }: IProps) {
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm<brandFormData>({
        resolver: brandResolver,
        defaultValues: { name: brand?.name || '', logo: brand?.logo },
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(brand ? brand.status === EStatus.ENABLED : true);
    const router = useRouter();

    async function handleRemoveImage(value: imageType) {
        if (brand && !(value instanceof File)) {
            setLoading(true);
            await brandService.removeLogo(brand.id);
            setLoading(false);
        }
        setValue('logo', undefined);
    }

    const handleOnSubmit: SubmitHandler<brandFormData> = async (data) => {
        setLoading(true);

        if (data.logo && data.logo instanceof File) {
            const formData = new FormData();
            formData.set(EKeys.LOGO, data.logo);
            data.logo = await uploadFileService.single(EKeys.LOGO, formData);
        }

        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;
        const result = brand ? await brandService.edit(brand.id, data) : await brandService.create(data);

        if ('error' in result) {
            logger({ error: parseError(result) });
        } else {
            router.push(EPath.MANAGE_BRAND_EDIT.concat(result.id.toString()));
        }

        setLoading(false);
    };

    return (
        <Paper
            component='form'
            elevation={0}
            sx={{ width: 460, p: 3, mt: 3, mx: 'auto', '& > div:not(:last-of-type)': { mb: 3 } }}
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
                <FormLabel id='input-logo' required>
                    Logo
                </FormLabel>
                <Controller
                    control={control}
                    name='logo'
                    render={({ field: { value, onChange } }) => (
                        <SingleImageField
                            value={!(value instanceof FormData) ? value : undefined}
                            onRemoveImage={handleRemoveImage}
                            onChange={onChange}
                        />
                    )}
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

            <Box display='flex'>
                <Button type='submit' variant='contained' disabled={loading}>
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

export default BrandForm;
