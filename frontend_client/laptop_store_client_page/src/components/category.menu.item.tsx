import { Fragment } from 'react';
import { ICategory } from '~/types/models';
import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from './ui/dropdown-menu';

interface IProps {
    category: ICategory;
}

function CategoryMenuItem({ category }: IProps) {
    return (
        <Fragment key={'category-' + category.id}>
            {category.children.length > 0 ? (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {category.children.map((child) => (
                                <CategoryMenuItem key={'category-' + child.id} category={child} />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            ) : (
                <DropdownMenuItem>{category.name}</DropdownMenuItem>
            )}
        </Fragment>
    );
}

export default CategoryMenuItem;
