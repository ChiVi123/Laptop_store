'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, FormControlLabel, Paper, Switch, TextField } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DragEvent, FormEvent, Fragment, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { EPath } from '~/common/enums';
import { ICategory } from '~/types/models';
import { logger } from '~/utils';
import CustomTreeItem from './custom.tree.item';

declare global {
    interface DOMStringMap {
        id: string;
    }
}

interface IDragAndDropStatus {
    type: 'handleDragStart' | 'handleDragOver' | 'handleDragEnter' | 'handleDragEnd' | '';
    dragFrom: number | null;
    dragTo: number | null;
}
interface ICategoryDemo extends Omit<ICategory, 'createdDate' | 'lastModifiedDate' | 'url'> {
    parentId: number | null;
    children: ICategoryDemo[];
    joinByOrderAndClone(categoryTable: ICategoryDemo[], relationTable: Relation[]): ICategoryDemo;
}

class Relation {
    public parentId: number;
    public childId: number;

    constructor(parentId: number, childId: number) {
        this.parentId = parentId;
        this.childId = childId;
    }
}
class CategoryDemo implements ICategoryDemo {
    public parentId: number | null;
    public id: number;
    public name: string;
    public children: ICategoryDemo[];

    constructor(parentId: number | null, id: number, name: string, children: ICategoryDemo[]) {
        this.parentId = parentId;
        this.id = id;
        this.name = name;
        this.children = children;
    }

    public joinByOrderAndClone(categoryTable: ICategoryDemo[], relationTable: Relation[]): ICategoryDemo {
        const childrenIds = relationTable.filter((item) => item.parentId === this.id).map((item) => item.childId);
        const children = categoryTable.reduce((prev, current) => {
            if (childrenIds.includes(current.id)) {
                prev.push(current.joinByOrderAndClone(categoryTable, relationTable));
            }
            return prev;
        }, [] as ICategoryDemo[]);
        return new CategoryDemo(this.parentId, this.id, this.name, children);
    }
}

const initTbl: ICategoryDemo[] = [
    new CategoryDemo(null, 0, 'root', []),
    new CategoryDemo(0, 1, 'Laptop', []),
    new CategoryDemo(1, 2, 'Thuong hieu', []),
    new CategoryDemo(13, 3, 'Core I5', []),
    new CategoryDemo(1, 4, 'Cau hinh', []),
    new CategoryDemo(7, 5, 'O cung SSD', []),
    new CategoryDemo(2, 6, 'MSI', []),
    new CategoryDemo(8, 7, 'O cung', []),
    new CategoryDemo(0, 8, 'Linh kien may tinh', []),
    new CategoryDemo(2, 9, 'Apple (Macbook)', []),
    new CategoryDemo(4, 10, 'Laptop I3', []),
    new CategoryDemo(0, 11, 'San pham Apple', []),
    new CategoryDemo(7, 12, 'O cung HDD', []),
    new CategoryDemo(8, 13, 'CPU', []),
    new CategoryDemo(13, 14, 'Core I3', []),
];
const initRelation: Relation[] = [
    new Relation(0, 1),
    new Relation(0, 11),
    new Relation(0, 8),
    new Relation(1, 2),
    new Relation(1, 4),
    new Relation(2, 6),
    new Relation(2, 9),
    new Relation(4, 10),
    new Relation(7, 5),
    new Relation(7, 12),
    new Relation(8, 7),
    new Relation(8, 13),
    new Relation(13, 3),
    new Relation(13, 14),
];

interface IProps {
    categoryId?: number;
    categoryParentId?: number;
}

function CategoryTreeView({ categoryId, categoryParentId }: IProps) {
    const [dragAndDrop, setDragAndDrop] = useState<IDragAndDropStatus>({ type: '', dragTo: null, dragFrom: null });
    const [categoryTable, setCategoryTable] = useState<ICategoryDemo[]>(initTbl);
    const [relationTable, setRelationTable] = useState<Relation[]>(initRelation);

    const inputNameRef = useRef<HTMLInputElement>();

    const categoryTree = useMemo(() => {
        const roots = categoryTable.filter((item) => item.parentId === null);

        return roots.reduce(function (prev, current) {
            prev.push(current.joinByOrderAndClone(categoryTable, relationTable));
            return prev;
        }, [] as ICategoryDemo[]);
    }, [categoryTable, relationTable]);
    const category = useMemo(() => categoryTable.find((item) => item.id === categoryId), [categoryId, categoryTable]);
    const expanded = useMemo(() => {
        if (categoryId === undefined) {
            return [];
        }

        let result: string[] = [categoryId.toString()];
        let parentId: number | null | undefined = categoryId;
        do {
            const item = categoryTable.find((item) => item.id === parentId);
            if (item && item.parentId !== null) {
                result.push(item.parentId.toString());
            }
            parentId = item?.parentId;
        } while (parentId !== null);

        return result.reverse();
    }, [categoryId, categoryTable]);

    const router = useRouter();

    const styleBefore = {
        content: '""',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        p: 1,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'primary.main',
        borderRadius: 1,
        color: 'primary.main',
        zIndex: 2,
    };

    function handleSetSelected(_: SyntheticEvent, nodeId: string) {
        router.push(EPath.MANAGE_CATEGORY.concat('/edit/', nodeId));
    }
    function handleDragStart(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dragFrom = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragStart', dragFrom });
    }
    function handleDragOver(event: DragEvent<HTMLElement>) {
        event.preventDefault();
    }
    function handleDragEnter(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dragTo = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragEnter', dragTo });
    }
    function handleDragEnd() {
        const { dragFrom, dragTo } = dragAndDrop;
        if (dragFrom !== null && dragTo !== null && dragTo !== dragFrom) {
            setCategoryTable((prev) => {
                return prev.map((item) => {
                    if (item.id === dragFrom) {
                        item.parentId = dragTo;
                    }
                    return item;
                });
            });
            setRelationTable((prev) => {
                const index = prev.findIndex((item) => item.childId === dragFrom);
                if (index >= 0) {
                    prev.splice(index, 1);
                    prev.push({ parentId: dragTo, childId: dragFrom });
                    return [...prev];
                } else {
                    return prev;
                }
            });
        }
        setDragAndDrop({ type: 'handleDragEnd', dragFrom: null, dragTo: null });
    }
    function handleDelete(id: number) {
        setCategoryTable((prev) => prev.filter((item) => item.id !== id));
        setRelationTable((prev) => prev.filter((item) => item.childId !== id || item.parentId !== id));
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { current } = inputNameRef;
        if (current && current.value !== category?.name) {
            setCategoryTable((prev) =>
                prev.map((item) => {
                    if (item.id === category?.id) {
                        item.name = current.value;
                    }
                    return item;
                }),
            );
        }
    }

    function renderTreeItem(node: ICategoryDemo) {
        return (
            <CustomTreeItem
                key={node.id}
                nodeId={node.id.toString()}
                label={node.name.concat(` (ID: ${node.id})`)}
                data-id={node.id}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                sx={{
                    position: 'relative',
                    '& > .MuiTreeItem-content::before': dragAndDrop.dragTo === node.id ? styleBefore : {},
                }}
            >
                {node.children.map((child) => renderTreeItem(child))}
            </CustomTreeItem>
        );
    }

    if (false) {
        logger({ categoryTree });
    }

    return (
        <Fragment>
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                <Button
                    variant='outlined'
                    size='small'
                    LinkComponent={Link}
                    href={EPath.MANAGE_CATEGORY.concat(`/add/${categoryId}`)}
                >
                    Them moi
                </Button>

                <Button variant='contained' size='small' color='warning'>
                    Xoa
                </Button>
            </Paper>

            <Box display='flex' gap={4} mt={2}>
                <TreeView
                    aria-label='category tree'
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={expanded}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleSetSelected}
                    sx={{ flex: 1, height: '100%' }}
                >
                    {categoryTree.map((item) => renderTreeItem(item))}
                </TreeView>

                <Box width='40%' component='form' onSubmit={handleSubmit}>
                    <TextField
                        inputRef={inputNameRef}
                        id='input-name'
                        name='name'
                        type='text'
                        label=''
                        placeholder='Nhập tên...'
                        autoComplete='on'
                        defaultValue={category?.name}
                        size='small'
                        fullWidth
                    />
                    <FormControlLabel
                        label='Bat'
                        control={<Switch inputProps={{ 'aria-label': 'category-status' }} defaultChecked />}
                    />

                    <Box>
                        <Button type='submit' variant='contained' sx={{ mt: 2 }}>
                            Luu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}

export default CategoryTreeView;
