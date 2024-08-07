'use client';

import { CaretLeftIcon, CaretRightIcon, HomeIcon, PersonIcon, TokensIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthenticated, useLogout } from '~/hooks/auth';
import { useAppSelector } from '~/hooks/redux';
import { selectCartSize, selectDefaultCategory } from '~/libs/redux/features';
import { cn } from '~/libs/utils';

import DialogLogin from './dialog.login';
import { CartIcon } from './icons';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Separator } from './ui/separator';

function BottomNavigation() {
    const cartSize = useAppSelector(selectCartSize);
    const { children: categories } = useAppSelector(selectDefaultCategory);
    const [indexCategory, setIndexCategory] = useState<number>(0);
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [openAccount, setOpenAccount] = useState<boolean>(false);
    const isExpired = useAuthenticated();
    const router = useRouter();
    const pathname = usePathname();
    const logout = useLogout();

    const navItems = [
        { path: '/account/profile', content: 'Thông tin tài khoản' },
        { path: '/account/address', content: 'Sổ địa chỉ' },
    ];

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

            <Button
                type='button'
                aria-label='btn-nav-home'
                variant='ghost'
                size='icon'
                className={cn('size-10', {
                    'text-cv-primary-100 hover:text-cv-primary-100': pathname === '/',
                })}
                asChild
            >
                <Link href='/'>
                    <HomeIcon className='size-6' />
                </Link>
            </Button>

            {/* Category button */}
            <Drawer open={openCategory} onOpenChange={setOpenCategory}>
                <DrawerTrigger asChild>
                    <Button type='button' aria-label='btn-nav-cate' variant='ghost' size='icon' className='size-10'>
                        <TokensIcon className='size-6' />
                    </Button>
                </DrawerTrigger>

                <DrawerContent className='border-0'>
                    <DrawerHeader className='border border-r-2'>
                        <DrawerTitle>Danh mục sản phẩm</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className='grid grid-cols-[25%_75%] h-96 pt-1 bg-border'>
                        <div className='h-[inherit] overflow-y-auto'>
                            {categories.map((category, index) => (
                                <Button
                                    key={'bottom-nav-' + category.id}
                                    variant='outline'
                                    className={cn('w-full h-8 p-6 border-0 border-b-2 rounded-none font-normal', {
                                        'hover:text-cv-primary-100': indexCategory === index,
                                    })}
                                    onClick={() => setIndexCategory(index)}
                                >
                                    {category.info.name}
                                </Button>
                            ))}
                        </div>
                        <div className='flex-1 h-[inherit] p-2 ml-2 space-y-4 bg-white overflow-y-auto'>
                            {categories[indexCategory] &&
                                categories[indexCategory].children.map((category) => (
                                    <div key={'bottom-nav-content-' + category.id} className='space-y-2'>
                                        <Link
                                            href={`/category/${category.info.id}`}
                                            className='font-semibold text-cv-primary-100'
                                            onClick={() => setOpenCategory(false)}
                                        >
                                            {category.info.name}
                                        </Link>
                                        <div className='grid grid-cols-2 gap-2'>
                                            {category.children.map((item) => (
                                                <Button
                                                    key={'bottom-nav-sub-' + item.id}
                                                    variant='outline'
                                                    asChild
                                                    className='w-full h-full font-normal text-wrap'
                                                    onClick={() => setOpenCategory(false)}
                                                >
                                                    <Link href={`/category/${item.info.id}`}>{item.info.name}</Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

            <Button
                type='button'
                aria-label='btn-nav-cart'
                variant='ghost'
                size='icon'
                className='relative size-10'
                asChild
            >
                <Link href='/cart'>
                    <CartIcon
                        className={cn('size-6', {
                            'text-cv-primary-100 hover:text-cv-primary-100': pathname === '/cart',
                        })}
                    />
                    {!isExpired && (
                        <Badge variant='destructive' className='absolute -top-1 -right-2 px-1.5 rounded-full'>
                            {cartSize}
                        </Badge>
                    )}
                </Link>
            </Button>

            {isExpired ? (
                <DialogLogin>
                    <Button type='button' aria-label='btn-nav-acc' variant='ghost' size='icon' className='size-10'>
                        <PersonIcon className='size-6' />
                    </Button>
                </DialogLogin>
            ) : (
                <Drawer open={openAccount} onOpenChange={setOpenAccount}>
                    <DrawerTrigger asChild>
                        <Button
                            type='button'
                            aria-label='btn-nav-acc'
                            variant='ghost'
                            size='icon'
                            className={cn('size-10', {
                                'text-cv-primary-100 hover:text-cv-primary-100': pathname.includes('/account'),
                            })}
                        >
                            <PersonIcon className='size-6' />
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader className='border border-r-2'>
                            <DrawerTitle>Quản Lý Tài Khoản</DrawerTitle>
                            <DrawerDescription></DrawerDescription>
                        </DrawerHeader>
                        <div className='py-4'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn('flex justify-between px-5 py-2 bg-white', {
                                        'text-cv-primary-100 hover:text-cv-primary-100': item.path === pathname,
                                    })}
                                    onClick={() => setOpenAccount(false)}
                                >
                                    {item.content}
                                    <CaretRightIcon className='size-6' />
                                </Link>
                            ))}

                            <Separator />

                            <div className='px-5 mt-2'>
                                <Button
                                    variant='outline'
                                    className='w-full border-cv-primary-100 text-cv-primary-100'
                                    onClick={logout}
                                >
                                    Đăng xuất
                                </Button>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            )}

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
