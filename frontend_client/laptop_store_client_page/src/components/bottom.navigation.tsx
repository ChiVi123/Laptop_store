'use client';

import { CaretLeftIcon, CaretRightIcon, HomeIcon, PersonIcon, TokensIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { useAppSelector } from '~/hooks/redux';
import { categorySelectors } from '~/libs/redux/features';

import clsx from 'clsx';
import { CartIcon } from './icons';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from './ui/drawer';

function BottomNavigation() {
    const { children: categories } = useAppSelector(categorySelectors.selectDefault);
    const [indexCategory, setIndexCategory] = useState<number>(0);
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

            <Drawer handleOnly>
                <DrawerTrigger asChild>
                    <Button type='button' aria-label='btn-nav-cate' variant='ghost' size='icon' className='size-10'>
                        <TokensIcon className='size-6' />
                    </Button>
                </DrawerTrigger>

                <DrawerContent className='border-0'>
                    <DrawerPrimitive.Handle />
                    <DrawerHeader className='border border-r-2'>Danh mục sản phẩm</DrawerHeader>
                    <div className='grid grid-cols-[25%_75%] h-96 pt-1 bg-border'>
                        <div className='h-[inherit] overflow-y-auto'>
                            {categories.map((category, index) => (
                                <Button
                                    key={'bottom-nav-' + category.id}
                                    variant='outline'
                                    className={clsx('w-full h-8 p-6 border-0 border-b-2 rounded-none font-normal', {
                                        'hover:text-cv-primary-100': indexCategory === index,
                                    })}
                                    onClick={() => setIndexCategory(index)}
                                >
                                    {category.info.name}
                                </Button>
                            ))}
                        </div>
                        <div className='flex-1 h-[inherit] p-2 ml-2 space-y-4 bg-white overflow-y-auto'>
                            {categories[indexCategory].children.map((category) => (
                                <div key={'bottom-nav-content-' + category.id} className='space-y-2'>
                                    <div className='font-semibold text-cv-primary-100'>{category.info.name}</div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        {category.children.map((item) => (
                                            <Button
                                                key={'bottom-nav-sub-' + item.id}
                                                variant='outline'
                                                className='w-full h-full font-normal text-wrap'
                                            >
                                                {item.info.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {categories[indexCategory].children.map((category) => (
                                <div key={'bottom-nav-content-' + category.id} className='space-y-2'>
                                    <div className='font-semibold text-cv-primary-100'>{category.info.name}</div>
                                    <div className='grid grid-cols-2 gap-3'>
                                        {category.children.map((item) => (
                                            <Button
                                                key={'bottom-nav-sub-' + item.id}
                                                variant='outline'
                                                className='w-full h-full font-normal text-wrap'
                                            >
                                                {item.info.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

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
