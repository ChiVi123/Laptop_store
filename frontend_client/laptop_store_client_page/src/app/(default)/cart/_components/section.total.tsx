'use client';

import '~/libs/extension.number';

import { useMemo } from 'react';
import { ICartItem } from '~/types/models';

function SectionTotal({ cart }: { cart: ICartItem[] }) {
    const total = useMemo(() => cart.reduce((prev, current) => prev + current.total, 0), [cart]);
    return (
        <div className='flex justify-between items-end'>
            <span className='text-sm text-cv-gray-100'>Tổng tiền:</span>
            <span className='font-semibold text-cv-primary-100'>{total.toCurrency()}</span>
        </div>
    );
}

export default SectionTotal;
