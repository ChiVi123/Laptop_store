'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useAppSelector } from '~/hooks/redux';
import { selectDefaultCategory } from '~/libs/redux/features';
import { cn } from '~/libs/utils';

import CategoryMenuItem from './category.menu.item';

interface IProps {
    className?: string;
}

function HeaderCategoryMenu({ className }: IProps) {
    const category = useAppSelector(selectDefaultCategory);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className={cn('gap-2', className)}>
                    <HamburgerMenuIcon className='size-[1.125rem] text-cv-gray-80' />
                    <span className='mb-0.5 text-center font-medium text-cv-gray-70'>Danh mục</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='start' className='w-56'>
                {category.children.map((item) => (
                    <CategoryMenuItem key={'top-bar-cate-' + item.id} category={item} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HeaderCategoryMenu;
