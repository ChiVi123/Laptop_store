'use client';

import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { categoryServerAction } from '~/actions';
import { EText } from '~/common/enums';
import { ICategoryNode } from '~/types/models';

interface IProps {
    category: ICategoryNode;
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    transform: 'translate(-50%, -50%)',
    p: 4,
};

function CategoryBar({ category }: IProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteItem = async () => {
        await categoryServerAction.destroy(category.id);
    };

    return (
        <Box display='flex' justifyContent='space-between' px={3} pb={2} bgcolor='white'>
            <Typography variant='h2' mt={2}>
                {category.info.name}
            </Typography>
            <Button variant='contained' color='warning' onClick={handleOpen}>
                {EText.DELETE}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-category-title'
                aria-describedby='modal-category-description'
            >
                <Box sx={styleModal}>
                    <Typography id='modal-category-title' variant='h4' component='h2'>
                        Xóa danh mục
                    </Typography>
                    <Typography id='modal-category-description' sx={{ mt: 2 }}>
                        Bạn có muốn xóa danh mục {`"${category.info.name}"`} không?.
                    </Typography>
                    <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                        <Button color='inherit' onClick={handleClose}>
                            {EText.CANCEL}
                        </Button>
                        <Button variant='contained' onClick={handleDeleteItem}>
                            {EText.DELETE}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default CategoryBar;
