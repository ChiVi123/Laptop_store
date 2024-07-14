'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOGO_URL } from '~/common/values';
import { Container } from '~/components';
import { Separator } from '~/components/ui/separator';

function TopBar() {
    const pathname = usePathname();

    return (
        <Container className='flex items-center gap-4 h-[3.875rem] py-[11px]'>
            <Link href='/' title='home' className='p-1.5 -ml-1'>
                <Image src={LOGO_URL} alt='logo' width={50} height={50} priority className='h-7 w-auto' />
            </Link>

            <Separator orientation='vertical' />

            {pathname === '/make-payment' && <span className='text-xl text-cv-primary-90'>Thanh toán</span>}
            {pathname === '/shipping' && <span className='text-xl text-cv-primary-90'>Địa chỉ giao hàng</span>}
        </Container>
    );
}

export default TopBar;
