'use client';

import { CaretLeftIcon, CaretRightIcon, HomeIcon, PersonIcon, TokensIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CartIcon } from './icons';
import { Button } from './ui/button';

function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const handleRouteBack = () => router.back();
    const handleRouteForward = () => router.forward();
    return (
        <div className='sticky right-0 bottom-0 left-0 flex lg:hidden justify-between p-2 bg-white border shadow-sm'>
            <Button
                type='button'
                aria-label='btn-nav-prev'
                variant='ghost'
                size='icon'
                disabled={pathname === '/'}
                className='w-10 h-10'
                onClick={handleRouteBack}
            >
                <CaretLeftIcon className='w-6 h-6' />
            </Button>
            <Button type='button' aria-label='btn-nav-home' variant='ghost' size='icon' className='w-10 h-10' asChild>
                <Link href='/'>
                    <HomeIcon className='w-6 h-6' />
                </Link>
            </Button>
            <Button type='button' aria-label='btn-nav-cate' variant='ghost' size='icon' className='w-10 h-10'>
                <TokensIcon className='w-6 h-6' />
            </Button>
            <Button type='button' aria-label='btn-nav-cart' variant='ghost' size='icon' className='w-10 h-10'>
                <CartIcon className='w-6 h-6' />
            </Button>
            <Button type='button' aria-label='btn-nav-acc' variant='ghost' size='icon' className='w-10 h-10'>
                <PersonIcon className='w-6 h-6' />
            </Button>
            <Button
                type='button'
                aria-label='btn-nav-next'
                variant='ghost'
                size='icon'
                className='w-10 h-10'
                onClick={handleRouteForward}
            >
                <CaretRightIcon className='w-6 h-6' />
            </Button>
        </div>
    );
}

export default BottomNavigation;
