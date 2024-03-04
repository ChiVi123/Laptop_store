'use client';

import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

interface IProps {}

function SortableOverlay({ children }: PropsWithChildren<IProps>) {
    return (
        <DragOverlay
            dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }),
            }}
        >
            {children}
        </DragOverlay>
    );
}

export default SortableOverlay;
