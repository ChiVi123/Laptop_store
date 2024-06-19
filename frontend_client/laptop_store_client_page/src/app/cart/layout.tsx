import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Container } from '~/components';

function CartLayout({ children }: PropsWithChildren) {
    return (
        <Container component='main' className='px-0 md:px-4 pt-[3.875rem] pb-8 md:py-[4.625rem]'>
            {children}
        </Container>
    );
}

export const metadata: Metadata = {
    title: 'Laptop Store | Giỏ hàng',
    description: 'Laptop Store',
};
export default CartLayout;
