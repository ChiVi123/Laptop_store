'use client';

import { toast } from 'sonner';

import { cartServerAction } from '~/actions';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { accountSelectors, cartActions } from '~/libs/redux/features';

import { Button } from '../ui/button';

function ButtonAddCart({ productId }: { productId: number }) {
    const account = useAppSelector(accountSelectors.selectAccount);
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if (account) {
            const cart = await cartServerAction.add({ productId, quantity: 1 });
            dispatch(cartActions.update(cart.items.length));
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
