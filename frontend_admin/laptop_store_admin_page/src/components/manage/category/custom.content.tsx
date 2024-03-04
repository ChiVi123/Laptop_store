'use client';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Typography } from '@mui/material';
import { TreeItemContentProps, useTreeItem } from '@mui/x-tree-view';
import clsx from 'clsx';
import React from 'react';

type mouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { nodeId, label, icon: iconProp, expansionIcon, displayIcon, className, classes } = props;
    const icon = iconProp || expansionIcon || displayIcon;
    const { disabled, focused, selected, expanded, preventSelection, handleExpansion, handleSelection } =
        useTreeItem(nodeId);

    function handleMouseDown(event: mouseEvent) {
        preventSelection(event);
    }
    function handleExpansionClick(event: mouseEvent) {
        handleExpansion(event);
    }
    function handleSelectionClick(event: mouseEvent) {
        handleSelection(event);
    }

    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            onMouseDown={handleMouseDown}
        >
            <div className={classes.iconContainer}>
                <DragIndicatorIcon />
            </div>
            <div className={classes.iconContainer} onClick={handleExpansionClick}>
                {icon}
            </div>
            <Typography className={classes.label} component='div' onClick={handleSelectionClick}>
                {label}
            </Typography>
        </div>
    );
});

export default CustomContent;
