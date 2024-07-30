import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';

import '~/libs/extension.number';

import { addressServerAction, cartServerAction } from '~/actions';
import { Key } from '~/common/enums';
import { Container } from '~/components';
import { ActionPayment, AddressPayment, MakePaymentProvider, SelectPayment } from './_components';

async function MakePaymentPage() {
    const accessToken = cookies().get(Key.ACCESS_TOKEN)?.value;
    const addressDefault = await addressServerAction.getDefault();
    const cart = accessToken ? await cartServerAction.getCart() : [];

    return (
        <Container component='main' className='px-0 md:px-4 py-4'>
            {/* width 1200px => 29% width 360px + 12px (gap-3) */}
            <div className='grid grid-cols-1 lg:grid-cols-[auto_29%_0] gap-3'>
                <MakePaymentProvider>
                    <div className='row-start-1 row-span-2 space-y-3'>
                        <div className='bg-white p-4 rounded-sm'>
                            {cart.map((item) => (
                                <div key={'cart-payment-item' + item.id} className='flex py-2 space-x-2'>
                                    <Image
                                        src={item.productThumbnail}
                                        alt={item.productName}
                                        width={84}
                                        height={84}
                                        className='size-20 lg:size-16'
                                    />
                                    <div className='min-w-96'>
                                        <p className='text-cv-gray-100'>{item.productName}</p>
                                        <div className='flex justify-between'>
                                            <span className='text-cv-gray-80'>SL: {item.quantity}</span>
                                            <span>{item.total.toCurrency()}</span>
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
                    <AddressPayment address={addressDefault} />

                    <div className='lg:col-start-2 lg:col-span-2'>
                        <ActionPayment cart={cart} />
                    </div>
                </MakePaymentProvider>
            </div>
        </Container>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store | Mua hàng',
    description: 'Laptop Store',
};
export default MakePaymentPage;
