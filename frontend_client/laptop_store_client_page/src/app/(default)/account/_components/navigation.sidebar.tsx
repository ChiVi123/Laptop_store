'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/libs/utils';

function NavigationSidebar() {
    const pathname = usePathname();
    const navItems = [
        { path: '/account/profile', content: 'Thông tin tài khoản' },
        { path: '/account/address', content: 'Sổ địa chỉ' },
    ];
    return (
        <nav className='mt-2'>
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={cn('flex justify-between px-5 py-2 hover:bg-gray-200', {
                        'bg-gray-200': item.path === pathname,
                    })}
                >
                    {item.content}
                </Link>
            ))}
        </nav>
    );
}

export default NavigationSidebar;
