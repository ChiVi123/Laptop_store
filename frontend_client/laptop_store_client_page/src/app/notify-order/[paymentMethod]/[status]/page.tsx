import Link from 'next/link';
import { Fragment } from 'react';
import { orderServerAction } from '~/actions';
import { Button } from '~/components/ui/button';

interface IProps {
    params: { paymentMethod: string; status: string };
    searchParams: {
        token: string | undefined;
        paymentId: string | undefined;
        PayerID: string | undefined;
    };
}

async function NotifyOrderPage({ params, searchParams }: IProps) {
    if (params.status === 'success') {
        const result = await orderServerAction.executePayment(params.paymentMethod, searchParams);
        return (
            <main>
                {result.isSuccess ? (
                    <h1 className='mt-5 text-xl text-center'>Thanh toán thành công</h1>
                ) : (
                    <Fragment>
                        <h1 className='mt-5 text-xl text-destructive text-center'>Thanh toán thất bại</h1>
                        <p className='mt-2 text-center'>
                            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
                        </p>
                    </Fragment>
                )}
                <div className='flex justify-center mt-5'>
                    <Button asChild>
                        <Link href='/'>Về trang chủ</Link>
                    </Button>
                </div>
            </main>
        );
    }

    if (params.status === 'cancel') {
        return (
            <main>
                <h1 className='mt-5 text-xl text-center'>Hủy đơn hàng</h1>
                <div className='flex justify-center mt-5'>
                    <Button asChild>
                        <Link href='/'>Về trang chủ</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main>
            <h1 className='mt-5 text-xl text-destructive text-center'>Thanh toán thất bại</h1>
            <p className='mt-2 text-center'>Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
            <div className='flex justify-center mt-5'>
                <Button asChild>
                    <Link href='/'>Về trang chủ</Link>
                </Button>
            </div>
        </main>
    );
}

export default NotifyOrderPage;
