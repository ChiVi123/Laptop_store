'use client';

import '~/libs/extension.number';

import { useRouter } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
import { orderServerAction } from '~/actions';
import { Button } from '~/components/ui/button';
import { ICartItem } from '~/types/models';
import { MakePaymentContext } from './make.payment.provider';

function ActionPayment({ cart }: { cart: ICartItem[] }) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const total = useMemo(() => cart.reduce((prev, current) => prev + current.total, 0), [cart]);
    const [state] = useContext(MakePaymentContext);

    const handleCreatePayment = async () => {
        setLoading(true);
        if (state.addressId) {
            const { addressId, paymentMethod } = state;

            const result = await orderServerAction.makePayment({ addressId, paymentMethod });
            if (result) {
                router.push(result);
            }
        }
        setLoading(false);
    };

    return (
        <div className='bg-white p-4 rounded-sm'>
            <div className='flex justify-between items-end'>
                <span className='text-sm text-cv-gray-100'>Tổng tiền:</span>
                <span className='font-semibold text-cv-primary-100'>{total.toCurrency()}</span>
            </div>
            <Button variant='destructive' disabled={loading} className='w-full mt-2.5' onClick={handleCreatePayment}>
                Đặt hàng
            </Button>
        </div>
    );
}

export default ActionPayment;
