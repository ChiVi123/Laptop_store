import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import '~/libs/extension.number';

import { cartServerAction } from '~/actions';
import { Key } from '~/common/enums';
import { RAW_CART } from '~/common/values';
import { Container } from '~/components';
import { Separator } from '~/components/ui/separator';
import { ActionPayment, SelectPayment } from './_components';

async function MakePaymentPage() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const { account, items, subTotal } = accessToken ? await cartServerAction.getCart() : RAW_CART;

    return (
        <Container component='main' className='px-0 md:px-4 py-4'>
            {/* width 1200px => 29% width 360px + 12px (gap-3) */}
            <div className='grid grid-cols-1 lg:grid-cols-[auto_29%_0] gap-3'>
                <div className='row-start-1 row-span-2 space-y-3'>
                    <div className='bg-white p-4 rounded-sm'>
                        {items.map((item) => (
                            <div key={'cart-payment-item' + item.id} className='flex py-2 space-x-2'>
                                <Image
                                    src={item.product.thumbnailUrl}
                                    alt={item.product.name}
                                    width={84}
                                    height={84}
                                    className='size-20 lg:size-16'
                                />
                                <div className='min-w-96'>
                                    <p className='text-cv-gray-100'>{item.product.name}</p>
                                    <div className='flex justify-between'>
                                        <span className='text-cv-gray-80'>SL: {item.quantity}</span>
                                        <span>{item.subTotal.toCurrency()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='bg-white p-4 rounded-sm'>
                        <h3 className='mb-5 text-lg font-semibold'>Chọn hình thức thanh toán</h3>
                        <SelectPayment />
                    </div>
                </div>

                {/* Side info */}
                <div className='row-start-1 row-span-1 lg:col-start-2 lg:col-span-2 bg-white p-4 rounded-sm space-y-2 lg:space-y-3.5'>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-sm text-cv-gray-40'>Giao tới</span>
                        <Link href='/shipping' className='text-sm text-cv-primary-100 hover:underline'>
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

                <div className='lg:col-start-2 lg:col-span-2'>
                    <ActionPayment total={subTotal.toCurrency()} />
                </div>
            </div>
        </Container>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store | Mua hàng',
    description: 'Laptop Store',
};
export default MakePaymentPage;
