'use client';

import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addProductAction, editProductAction, removeImageProductAction } from '~/actions/productActions';
import { uploadMultiImageAction } from '~/actions/uploadActions';
import { EKeys, EPath, EStatus, EText } from '~/common/enums';
import { productDefaultValues } from '~/common/values';
import { productResolver } from '~/resolvers';
import { productFormData } from '~/types/form.data';
import { IBrand, ICategory, IImage, IProduct } from '~/types/models';
import { logger } from '~/utils';
import FormLabel from '../../form.label';
import CategorySelectField from '../category.select.field';
import EditorField from '../editor.field';
import ImageField from '../image.field';
import NumberField from '../number.field';
import SelectField from '../select.field';
import { StyleBackgroundFormGroup } from '../styles';

interface IProps {
    product?: IProduct;
    categories: ICategory[];
    brands: IBrand[];
}

function ProductForm({ product, categories, brands }: IProps) {
    const defaultValues = useMemo(() => {
        if (!product) return productDefaultValues;

        const { brand, category } = product;
        return { ...product, brandId: brand.id, categoryId: category.id } as productFormData;
    }, [product]);
    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm<productFormData>({ resolver: productResolver, defaultValues });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(product?.status === EStatus.ENABLED);
    const router = useRouter();

    async function handleRemoveImage(value: IImage) {
        if (product && value.id) {
            const result = await removeImageProductAction(product.id, value.id);
            logger({ result });
        }
    }

    const handleOnSubmit: SubmitHandler<productFormData> = async (data, event) => {
        setLoading(true);

        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;

        if (data.images && data.images.length) {
            const formData = new FormData();

            data.images.forEach((image) => {
                if (image && image instanceof File) {
                    formData.append(EKeys.IMAGE, image);
                }
            });

            const resultImages = await uploadMultiImageAction(formData);
            data.images = resultImages.map(
                (image) =>
                    ({
                        publicId: image.public_id,
                        width: image.width,
                        height: image.height,
                        bytes: image.bytes,
                        folder: image?.folder,
                        secureUrl: image.secure_url,
                    } as IImage),
            );
        }
        let result;

        if (product) {
            result = await editProductAction(product.id, data);
        } else {
            result = await addProductAction(data);
        }

        if (result?.success) {
            router.push(EPath.MANAGE_PRODUCT_EDIT.concat(result.data.slug));
        } else if (result?.code === 409) {
            setError('name', { type: result?.code.toString(), message: result?.error?.message || 'error' });
        }

        logger({ data }, { result });

        setLoading(false);
    };

    return (
        <Box mt={3} px={3}>
            <Paper
                elevation={0}
                component='form'
                onSubmit={handleSubmit(handleOnSubmit)}
                sx={{
                    p: 3,
                    '& > div:not(:last-of-type)': { mb: 3 },
                }}
            >
                <div>
                    <FormControlLabel
                        label='Bật'
                        control={
                            <Switch
                                inputProps={{ 'aria-label': 'product-status' }}
                                checked={status}
                                onChange={(event) => setStatus(event.target.checked)}
                            />
                        }
                    />
                </div>

                <div>
                    <Typography variant='h2' mb={2}>
                        Thông tin chung
                    </Typography>
                    <Box
                        border='1px solid'
                        borderRadius={1}
                        sx={{ px: 1, py: 2, borderColor: 'border.main', '& > div:not(:first-of-type)': { mt: 2 } }}
                    >
                        <div>
                            <FormLabel id='input-name' required>
                                Tên sản phẩm
                            </FormLabel>
                            <Controller
                                name='name'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        id='input-name'
                                        type='text'
                                        label=''
                                        placeholder='Nhập tên sản phẩm...'
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
                            <FormLabel id='input-category' required>
                                Danh mục
                            </FormLabel>
                            <Controller
                                name='categoryId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <CategorySelectField
                                        id='input-category'
                                        value={value}
                                        tree={categories}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <FormLabel id='input-brand' required>
                                Thương hiệu
                            </FormLabel>
                            <Controller
                                name='brandId'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <SelectField
                                        id='input-brand'
                                        placeholder='Thương hiệu'
                                        items={brands}
                                        value={value ? value.toString() : undefined}
                                        optionKeyValue='id'
                                        optionKeyLabel='name'
                                        error={Boolean(errors.brandId?.message)}
                                        helperText={errors.brandId?.message || ''}
                                        onChange={(newValue) => onChange(parseInt(newValue))}
                                    />
                                )}
                            />
                        </div>
                    </Box>
                </div>

                <div>
                    <Typography variant='h2' mb={2}>
                        Mô tả sản phẩm
                    </Typography>
                    <Controller
                        control={control}
                        name='description'
                        render={({ field: { value, onChange } }) => (
                            <EditorField
                                value={value}
                                error={Boolean(errors.description?.message)}
                                helperText={errors.description?.message || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </div>

                <div>
                    <Typography variant='h2' mb={2}>
                        Các lựa chọn
                    </Typography>
                    <Box sx={{ '& > div:not(:first-of-type)': { mt: 3 } }}>
                        <StyleBackgroundFormGroup>
                            <FormLabel id='input-price' required>
                                Giá sản phẩm
                            </FormLabel>
                            <Controller
                                name='price'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <NumberField
                                        id='input-price'
                                        placeholder='Nhập giá sản phẩm...'
                                        error={Boolean(errors.price?.message)}
                                        helperText={errors.price?.message}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </StyleBackgroundFormGroup>
                        <StyleBackgroundFormGroup>
                            <FormLabel id='input-quantityStock' required>
                                Tồn kho
                            </FormLabel>
                            <Controller
                                control={control}
                                name='quantityStock'
                                render={({ field: { value, onChange } }) => (
                                    <NumberField
                                        id='input-quantityStock'
                                        placeholder='Nhập số lượng...'
                                        error={Boolean(errors.quantityStock?.message)}
                                        helperText={errors.quantityStock?.message}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </StyleBackgroundFormGroup>
                    </Box>
                </div>

                <div>
                    <Typography variant='h2' mb={2}>
                        Ảnh sản phẩm
                    </Typography>
                    <Box border='1px solid' borderRadius={1} sx={{ p: 2, borderColor: 'border.main' }}>
                        <Controller
                            control={control}
                            name='images'
                            render={({ field: { value, onChange } }) => (
                                <ImageField value={value} onRemove={handleRemoveImage} onChange={onChange} />
                            )}
                        />
                    </Box>
                    <FormHelperText error={Boolean(errors.images?.message)}>{errors.images?.message}</FormHelperText>
                </div>

                <Box display='flex' justifyContent='flex-end' gap={1}>
                    <Button type='submit' variant='contained' disabled={loading}>
                        {EText.SAVE}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default ProductForm;
