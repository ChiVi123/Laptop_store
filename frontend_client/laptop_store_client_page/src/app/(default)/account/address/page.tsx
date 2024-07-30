import { CheckCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Fragment } from 'react';
import { addressServerAction } from '~/actions';
import { buttonVariants } from '~/components/ui/button';
import { ButtonDelete } from './_components';

async function AddressPage() {
    const result = await addressServerAction.getAll();
    console.log('result', result);

    return (
        <Fragment>
            <h2 className='text-lg mb-6'>Sổ địa chỉ</h2>

            <div className='space-y-2'>
                <Link
                    href={'/account/address/create'}
                    className='flex items-center justify-center gap-2 p-4 bg-white border border-dashed rounded-md'
                >
                    <PlusIcon />
                    <span className='text-cv-primary-100'>Thêm địa chỉ mới</span>
                </Link>
                {result.map((item) => (
                    <div key={item.id} className='flex p-4 bg-white rounded-md'>
                        <div className='flex-1 h-full'>
                            <div className='flex gap-3 items-center'>
                                <div>{item.fullName}</div>
                                {item.selectDefault && (
                                    <div className='inline-flex items-center gap-0.5 text-green-700'>
                                        <CheckCircledIcon className='mt-0.5' />
                                        <span>Địa chỉ mặc định</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className='text-sm text-cv-gray-100'>Địa chỉ: </span>
                                <span className='text-sm'>{item.location}</span>
                            </div>
                            <div>
                                <span className='text-sm text-cv-gray-100'>Điện thoại: </span>
                                <span className='text-sm'>{item.phone}</span>
                            </div>
                        </div>

                        <div className='space-x-1'>
                            <Link
                                href={`/account/address/edit/${item.id}`}
                                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                            >
                                Chỉnh sửa
                            </Link>
                            {item.isChoose && <ButtonDelete addressId={item.id} />}
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

export default AddressPage;
