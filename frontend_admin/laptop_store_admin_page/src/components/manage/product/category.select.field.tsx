'use client';

import { AutocompleteChangeReason, FormHelperText, TextField } from '@mui/material';
import TreeSelect from 'mui-tree-select';
import { useCallback, useMemo } from 'react';
import { ICategoryInfo, ICategoryNode } from '~/types/models';

class Node implements ICategoryNode {
    id: number;
    info: ICategoryInfo;
    children: ICategoryNode[];
    createdDate: string;
    lastModifiedDate: string;

    constructor(node: ICategoryNode | ICategoryInfo) {
        if ('info' in node) {
            this.id = node.id;
            this.info = node.info;
            this.children = node.children;
            this.createdDate = node.createdDate;
            this.lastModifiedDate = node.lastModifiedDate;
        } else {
            this.id = 0;
            this.info = node;
            this.children = [];
            this.createdDate = '';
            this.lastModifiedDate = '';
        }
    }

    get childrenNode() {
        return Boolean(this.children.length) ? this.children.map((item) => new Node(item)) : null;
    }

    isBranch(): boolean {
        return Boolean(this.children.length);
    }

    isEqual(node: Node): boolean {
        return this.id === node.id;
    }

    toString(): string {
        return this.info.name;
    }
}
interface IProps {
    id: string;
    value?: ICategoryInfo[];
    tree: ICategoryNode[];
    error: boolean;
    helperText: string;
    onChange(value: ICategoryInfo[]): void;
}

function CategorySelectField({ id, value, tree, error, helperText, onChange }: IProps) {
    const data = useMemo(() => tree.map((item) => new Node(item)), [tree]);
    const nodeValue = useMemo(() => value?.map((item) => new Node(item)) ?? [], [value]);

    const handleGetParent = useCallback(
        (node: Node): Node | null => {
            let parentElement: ICategoryNode | undefined;
            let childrenElement = tree;

            node.info.code.split('-').forEach((pathId) => {
                if (!pathId) {
                    return;
                }

                parentElement = childrenElement.find((element) => element.info.id === Number(pathId));

                if (parentElement) {
                    childrenElement = parentElement.children;
                }
            });

            return parentElement ? new Node(parentElement) : null;
        },
        [tree],
    );

    function handleOnChange(_: any, nodes: Node[] | null, reason: AutocompleteChangeReason, __: any) {
        if (nodes === null) {
            return;
        }
        switch (reason) {
            case 'selectOption':
            case 'removeOption':
                onChange(nodes.map((item) => item.info));
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <TreeSelect
                id={'select-' + id}
                size='small'
                value={nodeValue}
                getChildren={(node) => (node ? node.childrenNode : data)}
                getParent={handleGetParent}
                multiple
                renderInput={(params) => <TextField {...params} label='' />}
                onChange={handleOnChange}
            />
            <div>
                <FormHelperText error={error}>{helperText}</FormHelperText>
            </div>
        </div>
    );
}

export default CategorySelectField;
