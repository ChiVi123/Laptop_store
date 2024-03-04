'use client';

import {
    Active,
    DndContext,
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Fragment, ReactNode, useMemo, useState } from 'react';
import SortableItem, { DragHandle } from './sortable.item';
import SortableOverlay from './sortable.overlay';

interface IBaseItem {
    id: UniqueIdentifier;
}
interface IProps<T extends IBaseItem> {
    items: T[];
    onChange(items: T[]): void;
    renderItem(item: T): ReactNode;
}

function SortableList<T extends IBaseItem>({ items, renderItem, onChange }: IProps<T>) {
    const [active, setActive] = useState<Active | null>(null);
    const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active?.id, items]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    function handleDragStart(event: DragStartEvent) {
        setActive(event.active);
    }
    function handleDragEnd(event: DragEndEvent) {
        if (event.over && event.active.id !== event.over.id) {
            const activeIndex = items.findIndex((item) => item.id === event.active.id);
            const overIndex = items.findIndex((item) => item.id === event.over?.id);
            onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
    }

    return (
        <DndContext
            id='sortable-list'
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActive(null)}
        >
            <SortableContext items={items}>
                <ul>
                    {items.map((item) => (
                        <Fragment key={item.id}>{renderItem(item)}</Fragment>
                    ))}
                </ul>
            </SortableContext>

            <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
        </DndContext>
    );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;

export default SortableList;
