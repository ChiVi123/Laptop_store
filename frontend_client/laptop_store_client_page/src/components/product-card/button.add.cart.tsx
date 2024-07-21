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
            dispatch(setCartSize(cart.length));
            toast.success('Đã thêm vào giỏ hàng');
        } else {
            toast.info('Đăng nhập để thêm giỏ hàng!!!');
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
