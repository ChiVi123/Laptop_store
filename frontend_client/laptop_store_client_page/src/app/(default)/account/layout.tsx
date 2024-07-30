import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { Container } from '~/components';
import { getProfile } from '~/services/account';
import { NavigationSidebar } from './_components';

async function AccountLayout({ children }: PropsWithChildren) {
    const account = await getProfile();

    return (
        <Container component='main' className='px-4 pt-[3.875rem] pb-8 py-[4.625rem]'>
            <div className='flex gap-x-4'>
                <div className='hidden sm:block sm:w-2/5 md:w-1/4'>
                    {/* Header account */}
                    <div className='flex flex-col lg:flex-row gap-3 items-center p-4'>
                        <div className='flex items-center justify-center size-10 border-2 border-cv-primary-100 rounded-full'>
                            <Image
                                src='/avatar.png'
                                alt={'avatar-' + account.fullName}
                                width={20}
                                height={20}
                                className='size-6'
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

                    <NavigationSidebar />
                </div>

                <div className='w-full'>{children}</div>
            </div>
        </Container>
    );
}

export default AccountLayout;
