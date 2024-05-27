'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { cartServerAction } from '~/actions';
import { useAppDispatch } from '~/hooks/redux';
import { cartActions } from '~/libs/redux/features';

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
        const cart = await cartServerAction.removeAllItem();
        dispatch(cartActions.update(cart.items.length));
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant='ghost' aria-label='btn-remove-all-cart-item' title='Xoá tất cả'>
                    <TrashIcon className='w-4 h-4' />
                </Button>
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
