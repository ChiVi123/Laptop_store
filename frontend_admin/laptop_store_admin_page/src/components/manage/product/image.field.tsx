'use client';

import { Clear as ClearIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Box, IconButton, Typography, Unstable_Grid2, styled } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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
interface IProps {
    onChange?: (value: File[]) => void;
}

function ImageField({ onChange }: IProps) {
    const [fileImages, setFileImages] = useState<File[]>([]);
    const shouldRevokeRef = useRef(true);

    useEffect(() => {
        if (onChange) {
            onChange(fileImages);
        }

        return () => {
            if (shouldRevokeRef.current) {
                fileImages.forEach((image) => {
                    URL.revokeObjectURL(image.src);
                });
            }
            shouldRevokeRef.current = true;
        };
    }, [fileImages, onChange]);

    function handleUploadImage({ target }: ChangeEvent<HTMLInputElement>) {
        if (target.files) {
            const files: File[] = [];
            for (let index = 0; index < target.files.length; index++) {
                const element = target.files[index];
                element.src = URL.createObjectURL(element);
                files.push(element);
            }
            target.value = '';
            shouldRevokeRef.current = false;
            setFileImages((prev) => [...prev, ...files]);
        }
    }
    function handleDeleteImage(index: number) {
        const [file] = fileImages.splice(index, 1);
        if (file) {
            URL.revokeObjectURL(file.src);
        }
        shouldRevokeRef.current = false;
        setFileImages([...fileImages]);
    }

    return (
        <Box>
            {!Boolean(fileImages.length) && (
                <Box
                    htmlFor='image-area-input'
                    position='relative'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
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
                    <Typography>Nhấn hoặc kéo thả tệp để tải lên</Typography>
                    <StyleVisuallyHiddenInput id='image-area-input' type='file' multiple onChange={handleUploadImage} />
                </Box>
            )}

            <Unstable_Grid2 container spacing={2}>
                {fileImages.map((image, index) => (
                    <Unstable_Grid2 key={index} xs={3}>
                        <Box
                            position='relative'
                            height={180}
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
                                onClick={() => handleDeleteImage(index)}
                            >
                                <ClearIcon fontSize='inherit' />
                            </IconButton>
                            <StyleImage src={image.src} alt={image.name} fill />
                        </Box>
                    </Unstable_Grid2>
                ))}
                {Boolean(fileImages.length) && (
                    <Unstable_Grid2 xs={3}>
                        <Box
                            htmlFor='image-area-input-inline'
                            position='relative'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='column'
                            height={180}
                            mb={4}
                            borderRadius={1}
                            component='label'
                            sx={{
                                p: 4,
                                borderWidth: 1,
                                borderStyle: 'dashed',
                                borderColor: 'action.active',
                                '&:hover': { opacity: 0.6, transition: (theme) => theme.transitions.create('opacity') },
                            }}
                        >
                            <CloudUploadIcon fontSize='large' />
                            <Typography sx={{ textAlign: 'center' }}>Nhấn hoặc kéo thả tệp để tải lên</Typography>
                            <StyleVisuallyHiddenInput
                                id='image-area-input-inline'
                                type='file'
                                multiple
                                onChange={handleUploadImage}
                            />
                        </Box>
                    </Unstable_Grid2>
                )}
            </Unstable_Grid2>
        </Box>
    );
}

export default ImageField;
