'use client';

import { useContext } from 'react';
import { toast } from 'sonner';

import { cartServerAction } from '~/actions';
import { DataContext } from '~/context';

import { Button } from '../ui/button';

function ButtonAddCart({ productId }: { productId: number }) {
    const { account } = useContext(DataContext);

    const handleClick = async () => {
        if (account) {
            await cartServerAction.add({ productId, quantity: 1 });
            toast.success('Đã thêm vào giỏ hàng', { duration: 1000 });
        } else {
            toast.info('Đăng nhập để thêm giỏ hàng!!!', { duration: 1000 });
        }
    };

    return (
        <Button
            variant='outline'
            className='w-full border-cv-primary-100 text-cv-primary-100 hover:bg-cv-primary-10 hover:text-cv-primary-200'
            onClick={handleClick}
        >
            Thêm giỏ hàng
        </Button>
    );
}

export default ButtonAddCart;
