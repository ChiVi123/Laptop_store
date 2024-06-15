import Link from 'next/link';
import { Fragment } from 'react';

import '~/libs/extension.number';

import { cartServerAction } from '~/actions';
import { CartTable } from '~/components';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

async function CartPage() {
    const { account, items, subTotal } = await cartServerAction.getCart();

    return (
        <Fragment>
            <h2 className='hidden lg:block mb-2 text-xl'>Giỏ hàng</h2>
            {/* width 1200px => 29% width 360px + 12px (gap-3) */}
            <div className='grid grid-cols-1 lg:grid-cols-[auto_29%_0] gap-3'>
                <CartTable data={items} />

                {/* Side info */}
                <div className='row-start-1 row-span-1 lg:col-start-2 lg:col-span-2 bg-white p-4 rounded-sm space-y-2 lg:space-y-3.5'>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-sm text-cv-gray-40'>Giao tới</span>
                        <Link href='/' className='text-sm text-cv-primary-100 hover:underline'>
                            Thay đổi
                        </Link>
                    </div>
                    <div className='flex gap-1.5 h-5'>
                        <span className='font-semibold text-sm text-cv-gray-400'>{account?.fullName}</span>
                        <Separator orientation='vertical' className='bg-cv-gray-40' />
                        <span className='font-semibold text-sm text-cv-gray-400'>{account?.phone}</span>
                    </div>
                    <p className='text-sm text-cv-gray-60'>
                        Số 190 Đường Võ Văn Ngân - Phường Bình Thọ - Tp. Thủ Đức Ho Chi Minh 700000
                    </p>
                </div>

                <div className='lg:col-start-2 lg:col-span-2 bg-white p-4 rounded-sm'>
                    <div className='flex justify-between items-end'>
                        <span className='text-sm text-cv-gray-100'>Tổng tiền</span>
                        <span className='font-semibold text-cv-primary-100'>{subTotal.toCurrency()}</span>
                    </div>
                    <Button variant='destructive' className='w-full mt-2.5'>
                        Mua hàng ({items.length})
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

export default CartPage;
