'use client';

import { styled } from '@mui/material';
import { TreeItem, TreeItemProps } from '@mui/x-tree-view';
import { Ref, forwardRef } from 'react';
import CustomContent from './custom.content';

const StyleTreeItem = styled(TreeItem)(({ theme: { palette } }) => ({
    '& .MuiTreeItem-content': {
        padding: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.divider,
    },
    '& .MuiCollapse-root': {
        marginLeft: 24,
    },
}));

function CustomTreeItem(props: TreeItemProps, ref: Ref<HTMLLIElement>) {
    return (
        <StyleTreeItem
            ref={ref}
            ContentComponent={CustomContent}
            {...props}
            onFocusCapture={(event) => event.stopPropagation()}
        />
    );
}

export default forwardRef(CustomTreeItem);
