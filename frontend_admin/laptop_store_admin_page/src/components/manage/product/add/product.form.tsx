'use client';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addProductAction } from '~/actions/productActions';
import { EPath } from '~/common/enums';
import { addProductResolver } from '~/resolvers';
import { addProductFormData } from '~/types/form.data';
import { IBrand, ICategory } from '~/types/models';
import { FormLabel, SelectField } from '..';
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
        defaultValues: { name: '', price: 0, description: '' },
    });
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleOnSubmit: SubmitHandler<addProductFormData> = async (data) => {
        setLoading(true);
        const result = await addProductAction(data);

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
                                        // name='name'
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
                                    <SelectField
                                        id='input-category'
                                        placeholder='Danh mục'
                                        items={categories}
                                        value='id'
                                        content='name'
                                        error={Boolean(errors.categoryId?.message)}
                                        helperText={errors.categoryId?.message || ''}
                                        onChange={(newValue) => onChange(parseInt(newValue))}
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
                        name='description'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                id='description'
                                name='description'
                                label=''
                                placeholder='Hãy viết nội dung hay...'
                                autoComplete='off'
                                size='small'
                                fullWidth
                                error={Boolean(errors.description?.message)}
                                helperText={errors.description?.message}
                                value={value}
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
                                    <TextField
                                        id='input-price'
                                        // name='price'
                                        type='number'
                                        label=''
                                        placeholder='Nhập giá sản phẩm...'
                                        autoComplete='off'
                                        size='small'
                                        fullWidth
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
                            <TextField
                                id='input-quantityStock'
                                name='quantityStock'
                                type='number'
                                label=''
                                placeholder='Nhập số lượng...'
                                autoComplete='off'
                                size='small'
                                fullWidth
                            />
                        </StyleBackgroundFormGroup>
                    </Box>
                </div>

                <Box display='flex' justifyContent='flex-end' gap={1}>
                    <Button type='button' variant='outlined'>
                        Lưu nháp
                    </Button>
                    <Button type='button' variant='contained'>
                        Lưu và ẩn sản phẩm
                    </Button>
                    <Button type='submit' variant='contained' disabled={loading}>
                        Lưu và bán sản phẩm ngay
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default ProductForm;
