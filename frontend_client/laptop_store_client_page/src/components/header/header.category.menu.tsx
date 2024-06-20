'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useAppSelector } from '~/hooks/redux';
import { categorySelectors } from '~/libs/redux/features';

import CategoryMenuItem from './category.menu.item';

function HeaderCategoryMenu() {
    const category = useAppSelector(categorySelectors.selectDefault);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='gap-2'>
                    <HamburgerMenuIcon width='1.125rem' height='1.125rem' className='text-cv-gray-80' />
                    <span className='mb-0.5 text-center font-medium text-cv-gray-70'>Danh mục</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='start' className='w-56'>
                {category.children.map((item) => (
                    <CategoryMenuItem key={'category-' + item.id} category={item} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HeaderCategoryMenu;
