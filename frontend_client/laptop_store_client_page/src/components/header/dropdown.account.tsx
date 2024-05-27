'use client';

import { useAppDispatch } from '~/hooks/redux';
import { apiRequest } from '~/libs';
import { accountActions } from '~/libs/redux/features';

import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

function DropdownAccount() {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const response = await apiRequest
            .get('api/logout', { baseURL: '' })
            .json<{ message: string; success: boolean }>();
        if (response.success) {
            dispatch(accountActions.logout());
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='gap-2'>
                    <span className='mb-0.5 text-center font-medium text-cv-gray-70'>Tài khoản</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem>Thông tin tài khoản</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropdownAccount;
