'use client';

import { Box, Button, FormHelperText, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addProductAction } from '~/actions/productActions';
import { uploadMultiImageAction } from '~/actions/uploadActions';
import { EKeys, EPath, EStatus } from '~/common/enums';
import { productDefaultValues } from '~/common/values';
import { addProductResolver } from '~/resolvers';
import { addProductFormData } from '~/types/form.data';
import { IBrand, ICategory } from '~/types/models';
import { logger } from '~/utils';
import FormLabel from '../../form.label';
import CategorySelectField from '../category.select.field';
import EditorField from '../editor.field';
import ImageField from '../image.field';
import NumberField from '../number.field';
import SelectField from '../select.field';
import { StyleBackgroundFormGroup } from '../styles';

interface IProps {
    categories: ICategory[];
    brands: IBrand[];
}

function ProductForm({ categories, brands }: IProps) {
    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm<addProductFormData>({
        resolver: addProductResolver,
        defaultValues: productDefaultValues,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleOnSubmit: SubmitHandler<addProductFormData> = async (data, event) => {
        setLoading(true);

        if (!event) {
            return;
        }

        const status = (event.nativeEvent as SubmitEvent).submitter?.ariaLabel || EStatus.DRAFT;

        logger({ data }, { status });

        if (data.images && data.images.length) {
            const formData = new FormData();
            data.images.forEach((image) => formData.append(EKeys.IMAGE, image));
            data.images = await uploadMultiImageAction(formData);
        }

        const result = await addProductAction({ ...data, status });

        if (result?.success) {
            router.push(EPath.MANAGE_PRODUCT_LIST);
        } else if (result?.code === 409) {
            setError('name', { type: result?.code.toString(), message: result?.error?.message || 'error' });
        }

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
                                render={({ field: { onChange } }) => (
                                    <CategorySelectField
                                        tree={categories}
                                        onChange={(newValue) => onChange(newValue)}
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
                                render={({ field: { onChange } }) => (
                                    <SelectField
                                        id='input-brand'
                                        placeholder='Thương hiệu'
                                        items={brands}
                                        value='id'
                                        content='name'
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
                        render={({ field: { onChange } }) => (
                            <EditorField
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
                            render={({ field: { onChange } }) => <ImageField onChange={onChange} />}
                        />
                    </Box>
                    <FormHelperText error={Boolean(errors.images?.message)}>{errors.images?.message}</FormHelperText>
                </div>

                <Box display='flex' justifyContent='flex-end' gap={1}>
                    <Button type='submit' aria-label={EStatus.DRAFT} variant='outlined' disabled={loading}>
                        Lưu nháp
                    </Button>
                    <Button type='submit' aria-label={EStatus.DISABLED} variant='contained' disabled={loading}>
                        Lưu và ẩn sản phẩm
                    </Button>
                    <Button type='submit' aria-label={EStatus.ENABLED} variant='contained' disabled={loading}>
                        Lưu và bán sản phẩm ngay
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default ProductForm;
