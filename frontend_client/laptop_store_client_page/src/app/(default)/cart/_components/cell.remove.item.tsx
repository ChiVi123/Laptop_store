'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { cartServerAction } from '~/actions';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import { useAppDispatch } from '~/hooks/redux';
import { setCartSize } from '~/libs/redux/features';
import { cn } from '~/libs/utils';

function CellRemoveItem({ id, className }: { id: number; className?: string }) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const cart = await cartServerAction.removeItem(id);
        dispatch(setCartSize(cart.length));
        setOpenDialog(false);
    };
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
                aria-label={`btn-remove-${id}-cart-item`}
                className={cn('flex justify-center items-center w-full p-2', className)}
            >
                <TrashIcon className='size-5' />
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chú ý</DialogTitle>
                    <DialogDescription>Bạn muốn xoá sản phẩm này ra khỏi giỏ hàng?</DialogDescription>
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

export default CellRemoveItem;
