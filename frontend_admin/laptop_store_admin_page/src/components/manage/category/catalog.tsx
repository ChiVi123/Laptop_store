'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import { DragEvent, useMemo, useState } from 'react';
import { ICategory } from '~/types/models';
import { logger } from '~/utils';
import CustomTreeItem from './custom.tree.item';

declare global {
    interface DOMStringMap {
        id: string;
    }

    interface Array<T> {
        swap(a: number, b: number): T[];
    }
}

interface IDragAndDropStatus {
    type: 'handleDragStart' | 'handleDragOver' | 'handleDragEnter' | 'handleDragEnd' | '';
    dragFrom: number | null;
    dragTo: number | null;
}
// interface IProps {
//     categories: any[];
//     onClick: (value: any) => void;
// }

interface ICategoryDemo extends Omit<ICategory, 'createdDate' | 'lastModifiedDate' | 'url'> {
    parentId: number | null;
    children: ICategoryDemo[];
    joinAndClone(table: ICategoryDemo[]): ICategoryDemo;
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

    public joinAndClone(table: ICategoryDemo[]): ICategoryDemo {
        const children = table.reduce((prev, current) => {
            if (current.parentId === this.id) {
                prev.push(current.joinAndClone(table));
            }
            return prev;
        }, [] as ICategoryDemo[]);
        return new CategoryDemo(this.parentId, this.id, this.name, children);
    }
}

const initTbl: ICategoryDemo[] = [
    new CategoryDemo(null, 1, 'Laptop', []),
    new CategoryDemo(1, 2, 'Thuong hieu', []),
    new CategoryDemo(13, 3, 'Core I5', []),
    new CategoryDemo(1, 4, 'Cau hinh', []),
    new CategoryDemo(7, 5, 'O cung SSD', []),
    new CategoryDemo(2, 6, 'MSI', []),
    new CategoryDemo(8, 7, 'O cung', []),
    new CategoryDemo(null, 8, 'Linh kien may tinh', []),
    new CategoryDemo(2, 9, 'Apple (Macbook)', []),
    new CategoryDemo(4, 10, 'Laptop I3', []),
    new CategoryDemo(null, 11, 'San pham Apple', []),
    new CategoryDemo(7, 12, 'O cung HDD', []),
    new CategoryDemo(8, 13, 'CPU', []),
    new CategoryDemo(13, 14, 'Core I3', []),
];

const initRelation: Relation[] = [
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

Array.prototype.swap = function (a: number, b: number) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Catalog() {
    const [dragAndDrop, setDragAndDrop] = useState<IDragAndDropStatus>({
        type: '',
        dragTo: null,
        dragFrom: null,
    });
    const [open, setOpen] = useState(false);
    const [categoryTable, setCategoryTable] = useState<ICategoryDemo[]>(initTbl);
    const [relationTable, setRelationTable] = useState<Relation[]>(initRelation);

    const catalog = useMemo(() => {
        const roots = categoryTable.filter((item) => item.parentId === null);

        return roots.reduce(function (prev, current) {
            prev.push(current.joinByOrderAndClone(categoryTable, relationTable));
            return prev;
        }, [] as ICategoryDemo[]);
    }, [categoryTable, relationTable]);

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
    function handleOpen(value: any) {
        // setCategory(value);
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    function renderTreeItem(node: ICategoryDemo) {
        return (
            <CustomTreeItem
                key={node.id}
                nodeId={node.id.toString()}
                label={
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography>{node.name}</Typography>
                        <ButtonGroup variant='outlined' color='inherit' size='small'>
                            <Button>Chỉnh sửa</Button>
                            <Button>Xóa</Button>
                        </ButtonGroup>
                    </Box>
                }
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

    if (true) {
        logger({ catalog });
    }

    return (
        <Box px={8} py={2} sx={{ '& > *': { mb: 4 } }}>
            <TreeView
                aria-label='category tree'
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root-4']}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {catalog.map((item) => renderTreeItem(item))}
            </TreeView>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Text in a modal
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        {/* {category?.name} */} bru
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}

export default Catalog;
