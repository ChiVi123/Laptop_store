'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { cartServerAction } from '~/actions';
import { useAppDispatch } from '~/hooks/redux';

import { setCartSize } from '~/libs/redux/features';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';

function CellRemoveAllItem() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const { items } = await cartServerAction.removeAllItem();
        dispatch(setCartSize(items.length));
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
                aria-label='btn-remove-all-cart-item'
                title='Xoá tất cả'
                className='flex justify-center items-center w-full'
            >
                <TrashIcon className='size-5' />
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chú ý</DialogTitle>
                    <DialogDescription>Bạn muốn xoá tất cả sản phẩm này ra khỏi giỏ hàng?</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                    <Button type='submit' form='dialog-log-in' onClick={handleClick}>
                        Đồng ý
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CellRemoveAllItem;
