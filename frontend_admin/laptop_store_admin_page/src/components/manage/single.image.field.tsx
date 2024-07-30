'use client';

import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, IconButton, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { IImage } from '~/types/models';

const StyleVisuallyHiddenInput = styled('input')({
    position: 'absolute',
    inset: 0,
    opacity: 0,
    cursor: 'pointer',
    zIndex: 2,
});
const StyleImage = styled(Image)({
    objectFit: 'contain',
});

declare global {
    interface File {
        src: string;
    }
}
export type imageType = File | IImage | undefined;
interface IProps {
    value?: imageType;
    onRemoveImage?: (value: imageType) => void;
    onChange?: (value: File | undefined) => void;
}

function SingleImageField({ value, onRemoveImage, onChange }: IProps) {
    const [image, setImage] = useState<imageType>(value);
    const sizeImage = 240;
    const imageSrc = image instanceof File ? image.src : image?.secureUrl;
    const imageName = image instanceof File ? image.name : image?.publicId;

    useEffect(() => {
        return () => {
            if (image && image instanceof File) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);

    function handleUploadImage({ target }: ChangeEvent<HTMLInputElement>) {
        if (target.files) {
            const file = target.files[0];
            file.src = URL.createObjectURL(file);
            if (onChange) {
                onChange(file);
            }
            setImage(file);
        }
    }
    function handleDeleteImage() {
        if (image && image instanceof File) {
            URL.revokeObjectURL(image.src);
        }
        if (onRemoveImage) {
            onRemoveImage(image);
        }
        setImage(undefined);
    }

    return (
        <Fragment>
            {image ? (
                <Box
                    position='relative'
                    width={sizeImage}
                    height={sizeImage}
                    borderRadius={1}
                    sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'action.disabled' }}
                >
                    <IconButton
                        aria-label='delete-image'
                        size='small'
                        sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            bgcolor: 'action.disabled',
                            color: 'white',
                            zIndex: 2,
                            '&:hover': { bgcolor: 'action.active' },
                        }}
                        onClick={handleDeleteImage}
                    >
                        <ClearIcon fontSize='inherit' />
                    </IconButton>
                    <StyleImage src={imageSrc || ''} alt={imageName || ''} sizes='auto' fill priority />
                </Box>
            ) : (
                <Box
                    htmlFor='image-area-input'
                    position='relative'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
                    width={sizeImage}
                    height={sizeImage}
                    mb={4}
                    borderRadius={1}
                    component='label'
                    sx={{
                        p: 4,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: 'primary.main',
                        '&:hover': { opacity: 0.6, transition: (theme) => theme.transitions.create('opacity') },
                    }}
                >
                    <CloudUploadIcon fontSize='large' />
                    <Typography sx={{ textAlign: 'center' }}>Nhấn hoặc kéo thả tệp để tải lên</Typography>
                    <StyleVisuallyHiddenInput id='image-area-input' type='file' onChange={handleUploadImage} />
                </Box>
            )}
        </Fragment>
    );
}

export default SingleImageField;
