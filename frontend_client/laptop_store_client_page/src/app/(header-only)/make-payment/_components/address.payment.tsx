'use client';

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Separator } from '~/components/ui/separator';
import { IAddress } from '~/types/models';
import { MakePaymentContext } from './make.payment.provider';

function AddressPayment({ address }: { address: IAddress }) {
    const [, setState] = useContext(MakePaymentContext);

    useEffect(() => {
        setState((prev) => ({ ...prev, addressId: address.id }));
    }, [address.id, setState]);

    return (
        <div className='row-start-1 row-span-1 lg:col-start-2 lg:col-span-2 bg-white p-4 rounded-sm space-y-2 lg:space-y-3.5'>
            <div className='flex justify-between'>
                <span className='font-semibold text-sm text-cv-gray-40'>Giao tới</span>
                <Link href='/shipping' className='text-sm text-cv-primary-100 hover:underline'>
                    Thay đổi
                </Link>
            </div>
            <div className='flex gap-1.5 h-5'>
                <span className='font-semibold text-sm text-cv-gray-400'>{address.fullName}</span>
                <Separator orientation='vertical' className='bg-cv-gray-40' />
                <span className='font-semibold text-sm text-cv-gray-400'>{address.phone}</span>
            </div>
            <p className='text-sm text-cv-gray-60'>{address.location}</p>
        </div>
    );
}

export default AddressPayment;
