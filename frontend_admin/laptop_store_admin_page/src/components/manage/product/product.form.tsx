'use client';

import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { productServerAction, uploadFileServerAction } from '~/actions';
import { EKeys, EStatus, EText } from '~/common/enums';
import { productDefaultValues } from '~/common/values';
import { useEntityStatus } from '~/hooks';
import { productResolver } from '~/resolvers';
import { productFormData } from '~/types/form.data';
import { ICategoryNode, IImage, IProductDetail } from '~/types/models';
import FormLabel from '../form.label';
import CategorySelectField from './category.select.field';
import EditorField from './editor.field';
import ImageField from './image.field';
import NumberField from './number.field';
import { StyleBackgroundFormGroup } from './styles';

interface IProps {
    product?: IProductDetail;
    categories: ICategoryNode[];
}

function ProductForm({ product, categories }: IProps) {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<productFormData>({
        resolver: productResolver,
        defaultValues: product ? { ...product, ...product?.info } : productDefaultValues,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useEntityStatus(product?.info);

    const handleRemoveImage = async (value: IImage) => {
        if (product && value.id) {
            await productServerAction.removeImage(product.id, value.id);
        }
    };

    const handleOnSubmit: SubmitHandler<productFormData> = async (data) => {
        setLoading(true);

        data.categoryIds = data.categories.map((item) => item.id);
        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;
        if (data.images && data.images.length) {
            const formData = new FormData();
            data.images.forEach((image) => {
                if (image && image instanceof File) {
                    formData.append(EKeys.IMAGE, image);
                }
            });
            data.images = await uploadFileServerAction.multiple(EKeys.IMAGE, formData);
        }
        product ? await productServerAction.edit(product.id, data) : await productServerAction.create(data);

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
                                name='categories'
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
