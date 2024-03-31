'use client';

import { AutocompleteChangeReason, TextField } from '@mui/material';
import TreeSelect from 'mui-tree-select';
import { useCallback, useMemo } from 'react';
import { ICategory } from '~/types/models';

class Node {
    private _value: ICategory;

    constructor(value: ICategory) {
        this._value = value;
    }

    get value(): ICategory {
        return this._value;
    }

    get director(): string {
        return this._value.director;
    }

    get children(): Node[] | null {
        const children = this._value.children;
        return Boolean(children.length) ? children.map((item) => new Node(item)) : null;
    }

    isBranch(): boolean {
        return Boolean(this._value.children.length);
    }

    isEqual(node: Node): boolean {
        return this._value.id === node.value.id;
    }

    toString(): string {
        return this._value.name;
    }
}
interface IProps {
    id: string;
    value?: ICategory[];
    tree: ICategory[];
    onChange(value: ICategory[]): void;
}

function CategorySelectField({ id, value, tree, onChange }: IProps) {
    const data = useMemo(() => tree.map((item) => new Node(item)), [tree]);
    const nodeValue = useMemo(() => (value === undefined ? [] : value.map((item) => new Node(item))), [value]);

    const handleGetParent = useCallback(
        (node: Node): Node | null => {
            let parentElement: ICategory | undefined;
            let childrenElement = tree;

            node.director.split(',').forEach((pathId) => {
                if (!pathId) {
                    return;
                }

                parentElement = childrenElement.find((element) => element.id === Number(pathId));

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
                onChange(nodes.map((item) => item.value));
                break;

            default:
                break;
        }
    }

    return (
        <TreeSelect
            id={'select-' + id}
            size='small'
            multiple
            value={nodeValue}
            getChildren={(node) => (node ? node.children : data)}
            getParent={handleGetParent}
            renderInput={(params) => <TextField {...params} label='' />}
            onChange={handleOnChange}
        />
    );
}

export default CategorySelectField;
