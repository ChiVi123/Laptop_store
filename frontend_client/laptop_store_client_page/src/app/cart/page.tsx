import Link from 'next/link';
import { Fragment } from 'react';

import '~/libs/extension.number';

import { CartTable } from '~/components';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { getCart } from '~/services';

async function CartPage() {
    const { account, items, subTotal } = await getCart();
    return (
        <Fragment>
            <h2 className='mb-2 text-xl'>Giỏ hàng</h2>
            <div className='flex gap-3'>
                <CartTable data={items} />

                {/* Side info */}
                <div className='w-[28.572%] space-y-3'>
                    <div className='bg-white p-4 rounded-sm space-y-3.5'>
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

                    <div className='bg-white p-4 rounded-sm'>
                        <div className='flex justify-between items-end'>
                            <span className='text-sm text-cv-gray-100'>Tổng tiền</span>
                            <span className='font-semibold text-cv-primary-100'>{subTotal.toCurrency()}</span>
                        </div>
                        <Button variant='destructive' className='w-full mt-2.5'>
                            Mua hàng ({items.length})
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CartPage;
