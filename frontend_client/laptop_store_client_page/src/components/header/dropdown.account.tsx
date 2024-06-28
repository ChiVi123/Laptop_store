'use client';

import Link from 'next/link';

import { useLogout } from '~/hooks/auth';
import { cn } from '~/libs/utils';
import { IAccount } from '~/types/models';

import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface IProps {
    account: IAccount;
    className?: string;
}

function DropdownAccount({ account, className }: IProps) {
    const logout = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className={cn('gap-2', className)}>
                    <span className='mb-0.5 text-center font-medium text-cv-gray-70'>{account.fullName}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href='/account/profile'>Thông tin tài khoản</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropdownAccount;
