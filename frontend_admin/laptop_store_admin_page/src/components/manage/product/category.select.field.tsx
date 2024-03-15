'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { ICategory } from '~/types/models';

interface IProps {
    tree: ICategory[];
    onChange(value: number): void;
}
interface ISelect {
    id: number;
    name: string;
}

function CategorySelectField({ tree, onChange }: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [parent, setParent] = useState<ICategory | null>(null);
    const [children, setChildren] = useState<ICategory[]>(tree);
    const [selected, setSelected] = useState<ISelect | null>(null);

    function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
    }
    function handleClick(director: string, nodeId?: number) {
        let parentElement: ICategory | null = null;
        let childrenElement = tree;

        director.split(',').forEach((pathId) => {
            if (!pathId) {
                return;
            }

            parentElement = childrenElement.find((element) => element.id === Number(pathId)) || null;

            if (parentElement) {
                childrenElement = parentElement.children;
            }
        });

        if (nodeId) {
            parentElement = childrenElement.find((element) => element.id === nodeId) || null;
            onChange(nodeId);
        }

        if (parentElement && parentElement.children.length) {
            setParent(parentElement);
            setChildren(parentElement.children);
            return;
        }

        if (!director && !parentElement) {
            setParent(null);
            setChildren(tree);
            return;
        }

        setSelected(parentElement ? { id: parentElement.id, name: parentElement.name } : null);
        setAnchorEl(null);
    }

    return (
        <Box>
            <Button
                id='dropdown-tree-select-button'
                variant='outlined'
                fullWidth
                disableRipple
                endIcon={<ArrowDropDownIcon />}
                onClick={handleOpenMenu}
            >
                {selected ? selected.name : 'Danh muc'}
            </Button>

            <Menu
                id='dropdown-tree-select'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ mt: 1.5, '& .MuiPaper-root': { minWidth: 180 } }}
            >
                {parent ? (
                    <MenuItem onClick={() => handleClick(parent.director)}>
                        <ChevronLeftIcon />
                        {parent.name}
                    </MenuItem>
                ) : null}
                {parent ? <Divider /> : null}
                {children.map((item) => (
                    <MenuItem
                        key={item.id}
                        selected={item.id === selected?.id}
                        onClick={() => handleClick(item.director, item.id)}
                    >
                        {item.name}
                        {item.children.length ? <ChevronRightIcon /> : null}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default CategorySelectField;
