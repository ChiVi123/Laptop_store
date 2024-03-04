'use client';

import { useState } from 'react';
import SortableList from './sortable.list';

const data = [
    {
        parentId: null,
        id: 1,
        name: 'Laptop',
        children: [
            {
                parentId: 1,
                id: 2,
                name: 'Thuong hieu',
                children: [
                    {
                        parentId: 2,
                        id: 6,
                        name: 'MSI',
                        children: [],
                    },
                    {
                        parentId: 2,
                        id: 9,
                        name: 'Apple (Macbook)',
                        children: [],
                    },
                ],
            },
            {
                parentId: 1,
                id: 4,
                name: 'Cau hinh',
                children: [
                    {
                        parentId: 4,
                        id: 10,
                        name: 'Laptop I3',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        parentId: null,
        id: 8,
        name: 'Linh kien may tinh',
        children: [
            {
                parentId: 8,
                id: 7,
                name: 'O cung',
                children: [
                    {
                        parentId: 7,
                        id: 5,
                        name: 'O cung SSD',
                        children: [],
                    },
                    {
                        parentId: 7,
                        id: 12,
                        name: 'O cung HDD',
                        children: [],
                    },
                ],
            },
            {
                parentId: 8,
                id: 13,
                name: 'CPU',
                children: [
                    {
                        parentId: 13,
                        id: 3,
                        name: 'Core I5',
                        children: [],
                    },
                    {
                        parentId: 13,
                        id: 14,
                        name: 'Core I3',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        parentId: null,
        id: 11,
        name: 'San pham Apple',
        children: [],
    },
];

function Sortable() {
    const [items, setItems] = useState(() => Array.from({ length: 10 }, (_, index) => ({ id: index + 1 })));

    return (
        <SortableList
            items={items}
            onChange={setItems}
            renderItem={(item) => (
                <SortableList.Item id={item.id}>
                    {item.id} <SortableList.DragHandle />
                </SortableList.Item>
            )}
        />
    );
}

export default Sortable;
