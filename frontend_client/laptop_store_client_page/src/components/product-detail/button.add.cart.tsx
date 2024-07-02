'use client';

import { toast } from 'sonner';

import { cartServerAction } from '~/actions';
import { useAuthenticated } from '~/hooks/auth';
import { useAppDispatch } from '~/hooks/redux';
import { setCartSize } from '~/libs/redux/features';

import { Button } from '../ui/button';

function ButtonAddCart({ productId }: { productId: number }) {
    const isExpired = useAuthenticated();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if (!isExpired) {
            const cart = await cartServerAction.add({ productId, quantity: 1 });
            dispatch(setCartSize(cart.items.length));
            toast.success('Đã thêm vào giỏ hàng');
        } else {
            toast.info('Đăng nhập để thêm giỏ hàng!!!');
        }
    };

    return (
        <Button type='button' variant='outline' size='lg' className='w-full' onClick={handleClick}>
            Thêm vào giỏ hàng
        </Button>
    );
}

export default ButtonAddCart;
