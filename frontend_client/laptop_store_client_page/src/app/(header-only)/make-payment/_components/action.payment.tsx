'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { orderServerAction } from '~/actions';
import { Button } from '~/components/ui/button';

function ActionPayment({ total }: { total: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleCreatePayment = async () => {
        setLoading(true);
        const result = await orderServerAction.makePayment('paypal');
        if (result) {
            router.push(result);
        }
        setLoading(false);
    };

    return (
        <div className='bg-white p-4 rounded-sm'>
            <div className='flex justify-between items-end'>
                <span className='text-sm text-cv-gray-100'>Tổng tiền:</span>
                <span className='font-semibold text-cv-primary-100'>{total}</span>
            </div>
            <Button variant='destructive' disabled={loading} className='w-full mt-2.5' onClick={handleCreatePayment}>
                Đặt hàng
            </Button>
        </div>
    );
}

export default ActionPayment;
