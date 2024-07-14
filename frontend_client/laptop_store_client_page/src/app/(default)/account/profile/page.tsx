import { Pencil1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Fragment } from 'react';

import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { getProfile } from '~/services/account';

async function ProfilePage() {
    const account = await getProfile();

    return (
        <Fragment>
            <h2 className='text-lg mb-4'>Thông tin tài khoản</h2>
            <div className='grid grid-cols-1 md:grid-cols-[auto_1px_auto] p-2 md:p-4 gap-2 bg-white rounded-md'>
                <div className='grid grid-cols-[4rem_auto] lg:grid-cols-[6rem_auto] gap-2 items-start'>
                    <h2 className='col-span-2 text-cv-gray-80'>Thông tin cá nhân</h2>
                    <AspectRatio
                        ratio={1}
                        className='relative flex items-center justify-center border-2 lg:border-4 border-cv-primary-60 rounded-full'
                    >
                        <Image
                            src='/avatar.png'
                            alt={'avatar-' + account.fullName}
                            width={40}
                            height={40}
                            className='size-8'
                            style={{
                                filter: 'brightness(0) saturate(100%) invert(15%) sepia(84%) saturate(2927%) hue-rotate(227deg) brightness(103%) contrast(111%)',
                            }}
                        />
                        <Button
                            type='button'
                            aria-label='btn-edit-avt'
                            size='icon'
                            className='absolute -right-2.5 lg:-right-0.5 bottom-1 size-6 rounded-full'
                        >
                            <Pencil1Icon className='size-3' />
                        </Button>
                    </AspectRatio>

                    <div className='space-y-4 md:space-y-9'>
                        <div className='grid grid-cols-[5rem_auto] gap-2 items-center'>
                            <Label>Họ & Tên</Label>
                            <Input />
                        </div>

                        <div className='grid grid-cols-[5rem_auto] gap-2 items-center'>
                            <Label>Nickname</Label>
                            <Input />
                        </div>
                    </div>
                </div>

                <Separator orientation='vertical' />

                <div className='space-y-2'>
                    <h2 className='col-span-2 text-cv-gray-80'>Thông tin liên lạc</h2>

                    <div className='space-y-4 md:space-y-9'>
                        <div className='grid grid-cols-[5rem_auto] gap-2 items-center'>
                            <Label>Số điện thoại</Label>
                            <Input />
                        </div>

                        <div className='grid grid-cols-[5rem_auto] gap-2 items-center'>
                            <Label>Địa chỉ email</Label>
                            <Input />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfilePage;
