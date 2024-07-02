'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useLogout } from '~/hooks/auth';
import { decodeJwt } from '~/libs/helper';
import { JwtPayload } from '~/libs/utilities';
import { cn } from '~/libs/utils';
import { IAccountToken } from '~/types/models';

import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface IProps {
    accountToken: IAccountToken;
    className?: string;
}

function DropdownAccount({ accountToken, className }: IProps) {
    const [decode, setDecode] = useState<JwtPayload>({ exp: 0, fullName: '', iat: 0, iss: '', sub: '' });
    const logout = useLogout();

    useEffect(() => {
        if (accountToken.accessToken) {
            setDecode(decodeJwt<JwtPayload>(accountToken.accessToken));
        }
    }, [accountToken.accessToken]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className={cn('gap-2', className)}>
                    <span className='mb-0.5 text-center font-medium text-cv-gray-70'>{decode.fullName}</span>
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
