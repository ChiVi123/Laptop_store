import { Fragment } from 'react';

import { ICategoryNode } from '~/types/models';

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';

interface IProps {
    category: ICategoryNode;
}

function CategoryMenuItem({ category }: IProps) {
    return (
        <Fragment key={'category-' + category.id}>
            {category.children.length > 0 ? (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>{category.info.name}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {category.children.map((child) => (
                                <CategoryMenuItem key={'category-' + child.id} category={child} />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            ) : (
                <DropdownMenuItem>{category.info.name}</DropdownMenuItem>
            )}
        </Fragment>
    );
}

export default CategoryMenuItem;
