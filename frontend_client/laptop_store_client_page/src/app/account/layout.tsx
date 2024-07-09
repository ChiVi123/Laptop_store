import { CaretRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Container } from '~/components';
import { getProfile } from '~/services/account';

async function AccountLayout({ children }: PropsWithChildren) {
    const account = await getProfile();
    const navItems = [
        { path: '/account/profile', content: 'Thông tin tài khoản' },
        { path: '/account/address', content: 'Sổ địa chỉ' },
    ];

    return (
        <Container component='main' className='px-4 pt-[3.875rem] pb-8 py-[4.625rem]'>
            <div className='flex gap-x-4'>
                <div className='hidden sm:block sm:w-2/5 md:w-1/4'>
                    {/* Header account */}
                    <div className='flex flex-col lg:flex-row gap-3 items-center p-4 bg-white'>
                        <div className='flex items-center justify-center size-12 border-2 border-cv-primary-100 rounded-full'>
                            <Image
                                src='/avatar.png'
                                alt={'avatar-' + account.fullName}
                                width={20}
                                height={20}
                                className='size-auto'
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(15%) sepia(84%) saturate(2927%) hue-rotate(227deg) brightness(103%) contrast(111%)',
                                }}
                            />
                        </div>

                        <div className='flex-1'>
                            <span className='text-gray-400'>Tài khoản của</span>
                            <p className='font-medium'>{account.fullName}</p>
                        </div>
                    </div>

                    <nav className='mt-2 space-y-2'>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={clsx('flex justify-between px-5 py-2 hover:bg-gray-200')}
                            >
                                {item.content}
                                <CaretRightIcon className='sm:hidden size-6' />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className='w-full'>{children}</div>
            </div>
        </Container>
    );
}

export default AccountLayout;
