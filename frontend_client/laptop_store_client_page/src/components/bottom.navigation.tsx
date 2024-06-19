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
        <div className='fixed right-0 bottom-0 left-0 flex sm:hidden justify-between p-2 bg-white border shadow-sm'>
            <Button
                type='button'
                aria-label='btn-nav-prev'
                variant='ghost'
                size='icon'
                disabled={pathname === '/'}
                className='size-10'
                onClick={handleRouteBack}
            >
                <CaretLeftIcon className='size-6' />
            </Button>

            <Button type='button' aria-label='btn-nav-home' variant='ghost' size='icon' className='size-10' asChild>
                <Link href='/'>
                    <HomeIcon className='size-6' />
                </Link>
            </Button>

            <Button type='button' aria-label='btn-nav-cate' variant='ghost' size='icon' className='size-10'>
                <TokensIcon className='size-6' />
            </Button>

            <Button type='button' aria-label='btn-nav-cart' variant='ghost' size='icon' className='size-10' asChild>
                <Link href='/cart'>
                    <CartIcon className='size-6' />
                </Link>
            </Button>

            <Button type='button' aria-label='btn-nav-acc' variant='ghost' size='icon' className='size-10'>
                <PersonIcon className='size-6' />
            </Button>

            <Button
                type='button'
                aria-label='btn-nav-next'
                variant='ghost'
                size='icon'
                className='size-10'
                onClick={handleRouteForward}
            >
                <CaretRightIcon className='size-6' />
            </Button>
        </div>
    );
}

export default BottomNavigation;
