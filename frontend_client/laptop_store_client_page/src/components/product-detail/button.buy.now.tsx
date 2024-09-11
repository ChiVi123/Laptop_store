'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cartServerAction } from '~/actions';
import { useAuthenticated } from '~/hooks/auth';
import { useAppDispatch } from '~/hooks/redux';
import { setCartSize } from '~/libs/redux/features';

import { Button } from '../ui/button';

function ButtonBuyNow({ productId }: { productId: number }) {
    const isExpired = useAuthenticated();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = async () => {
        if (!isExpired) {
            const cart = await cartServerAction.add({ productId, quantity: 1 });
            dispatch(setCartSize(cart.length));
            router.push('/cart');
        } else {
            toast.info('Đăng nhập để thêm giỏ hàng!!!');
        }
    };

    return (
        <Button type='button' size='lg' className='w-full' onClick={handleClick}>
            Mua ngay
        </Button>
    );
}

export default ButtonBuyNow;
