'use client';

import { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, PropsWithChildren, createContext, useContext, useMemo } from 'react';

interface IProps {
    id: UniqueIdentifier;
}
interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;
    ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({ attributes: {}, listeners: undefined, ref() {} });

function SortableItem({ children, id }: PropsWithChildren<IProps>) {
    const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
        id,
    });
    const context = useMemo(
        () => ({ attributes, listeners, ref: setActivatorNodeRef }),
        [attributes, listeners, setActivatorNodeRef],
    );
    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <SortableItemContext.Provider value={context}>
            <li ref={setNodeRef} style={style}>
                {children}
            </li>
        </SortableItemContext.Provider>
    );
}

export default SortableItem;

export function DragHandle() {
    const { attributes, listeners, ref } = useContext(SortableItemContext);

    return (
        <button ref={ref} {...attributes} {...listeners} aria-label='button-drag'>
            <svg viewBox='0 0 20 20' width='12'>
                <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
            </svg>
        </button>
    );
}
