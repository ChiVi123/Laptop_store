'use client';

import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createBrandAction, editBrandAction, removeLogoBrandAction } from '~/actions/brandActions';
import { uploadSingleImageAction } from '~/actions/uploadActions';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { brandResolver } from '~/resolvers';
import { brandFormData } from '~/types/form.data';
import { IBrand, IImage } from '~/types/models';
import { logger } from '~/utils';
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
    const [status, setStatus] = useState<boolean>(brand?.status === EStatus.ENABLED);
    const router = useRouter();

    async function handleRemoveImage(value: imageType) {
        if (brand && !(value instanceof File)) {
            setLoading(true);
            await removeLogoBrandAction(brand.id);
            setLoading(false);
        }
        setValue('logo', undefined);
    }

    const handleOnSubmit: SubmitHandler<brandFormData> = async (data) => {
        setLoading(true);
        logger({ data });

        if (data.logo && data.logo instanceof File) {
            const formData = new FormData();

            formData.set(EKeys.LOGO, data.logo);
            const resultLogo = await uploadSingleImageAction(EKeys.LOGO, formData);

            if (resultLogo) {
                const logo: IImage = {
                    publicId: resultLogo.public_id,
                    width: resultLogo.width,
                    height: resultLogo.height,
                    bytes: resultLogo.bytes,
                    folder: resultLogo?.folder,
                    secureUrl: resultLogo.secure_url,
                };
                data.logo = logo;
            }
        }

        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;
        let result;

        if (brand?.id) {
            result = await editBrandAction(brand.id, data);
            if (result.success) {
                setValue('name', result.data.name);
                setValue('logo.publicId', result.data.logo.publicId);
                setValue('logo.width', result.data.logo.width);
                setValue('logo.height', result.data.logo.height);
                setValue('logo.bytes', result.data.logo.bytes);
                setValue('logo.folder', result.data.logo.folder);
                setValue('logo.secureUrl', result.data.logo.secureUrl);
                setValue('status', result.data.status);
            }
        } else {
            result = await createBrandAction(data);
            if (result.success) {
                router.push(EPath.MANAGE_BRAND_EDIT.concat(result.data.id.toString()));
            }
        }

        logger({ result });
        setLoading(false);
    };

    logger({ logo: brand?.logo });

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
