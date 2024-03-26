'use client';

import { TextField } from '@mui/material';
import TreeSelect from 'mui-tree-select';
import { useCallback, useMemo } from 'react';
import { EStatus } from '~/common/enums';
import { ICategory } from '~/types/models';

class Node {
    private value: ICategory;

    constructor(value: ICategory) {
        this.value = value;
    }

    get id(): number {
        return this.value.id;
    }

    get director(): string {
        return this.value.director;
    }

    get children(): Node[] | null {
        const children = this.value.children;
        return Boolean(children.length) ? children.map((item) => new Node(item)) : null;
    }

    isBranch(): boolean {
        return Boolean(this.value.children.length);
    }

    isEqual(node: Node): boolean {
        return this.value.id === node.value.id;
    }

    toString(): string {
        return this.value.name;
    }
}
interface IProps {
    id: string;
    value?: number;
    tree: ICategory[];
    onChange(value: number): void;
}

function CategorySelectField({ id, value, tree, onChange }: IProps) {
    const data = useMemo(() => tree.map((item) => new Node(item)), [tree]);
    const nodeValue = useMemo(() => {
        const stack: ICategory[] = [];
        let category: ICategory | undefined = {
            id: 0,
            name: '',
            path: '',
            level: -1,
            director: '-1',
            children: tree,
            createdDate: '',
            lastModifiedDate: '',
            status: EStatus.ENABLED,
        };

        stack.push(category);

        while (stack.length > 0) {
            category = stack.pop();

            if (category?.id === value) {
                return category ? new Node(category) : null;
            } else if (category?.children.length) {
                category.children.forEach((child) => stack.push(child));
            }
        }

        return null;
    }, [tree, value]);

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

    function handleOnChange(_: any, value: Node | null, reason: any, detail: any) {
        if (value && reason === 'selectOption' && onChange) {
            onChange(value.id);
        }
    }

    return (
        <TreeSelect
            id={'select-' + id}
            size='small'
            value={nodeValue}
            getChildren={(node) => (node ? node.children : data)}
            getParent={handleGetParent}
            renderInput={(params) => <TextField {...params} label='' />}
            onChange={handleOnChange}
        />
    );
}

export default CategorySelectField;
