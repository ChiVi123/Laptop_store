'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, FormControlLabel, Paper, Switch, TextField } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DragEvent, Fragment, SyntheticEvent, useCallback, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createCategoryChildActions, movePositionCategoryAction } from '~/actions/categoryActions';
import { EPath, EProductStatus } from '~/common/enums';
import { addCategoryResolver } from '~/resolvers';
import { addCategoryFormData } from '~/types/form.data';
import { ICategory } from '~/types/models';
import { logger } from '~/utils';
import CustomTreeItem from './custom.tree.item';

declare global {
    interface DOMStringMap {
        parentId: string;
        id: string;
    }
}

interface IDragAndDropStatus {
    type: 'handleDragStart' | 'handleDragOver' | 'handleDragEnter' | 'handleDragEnd' | '';
    dragFromParent: number | null;
    dragFromChild: number | null;
    dragToParent: number | null;
}
interface IProps {
    categoryTree: ICategory[];
    category?: ICategory;
    categoryParent?: ICategory;
}

function CategoryTreeView({ categoryTree, category, categoryParent }: IProps) {
    const initDragAndDrop = useCallback(
        () => ({ type: '', dragFromParent: null, dragFromChild: null, dragToParent: null } as IDragAndDropStatus),
        [],
    );
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: addCategoryResolver,
        defaultValues: { name: category?.name || '', path: category?.path || '' },
    });
    const [dragAndDrop, setDragAndDrop] = useState(initDragAndDrop);
    const [status, setStatus] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const inputNameRef = useRef<HTMLInputElement>();
    const router = useRouter();

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

    function handleSetSelected(_: SyntheticEvent, nodeId: string) {
        router.push(EPath.MANAGE_CATEGORY.concat('/edit/', nodeId));
    }
    function handleDragStart(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dragFromParent = Number(event.currentTarget.dataset.parentId);
        const dragFromChild = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragStart', dragFromParent, dragFromChild });
    }
    function handleDragOver(event: DragEvent<HTMLElement>) {
        event.preventDefault();
    }
    function handleDragEnter(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dragToParent = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragEnter', dragToParent });
    }
    async function handleDragEnd() {
        const { dragFromParent, dragFromChild, dragToParent } = dragAndDrop;
        if (
            dragFromParent !== null &&
            dragFromChild !== null &&
            dragToParent !== null &&
            dragToParent !== dragFromChild
        ) {
            const result = await movePositionCategoryAction(dragFromParent, dragFromChild, dragToParent);
            logger({ result });
        }
        setDragAndDrop(initDragAndDrop());
    }
    function handleDelete(id: number) {}

    const handleOnSubmit: SubmitHandler<addCategoryFormData> = async (data) => {
        setDisabled(true);
        data.parentId = categoryParent?.id;
        data.status = status ? EProductStatus.ENABLED : EProductStatus.DISABLED;
        const result = await createCategoryChildActions(data);
        setDisabled(false);
        logger({ result });
    };

    function renderTreeItem(node: ICategory, parentId?: number) {
        return (
            <CustomTreeItem
                key={node.id}
                id={`parent-${parentId}-${node.id}`}
                nodeId={node.id.toString()}
                label={node.name.concat(` (ID: ${node.id})`)}
                data-parent-id={parentId}
                data-id={node.id}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                sx={{
                    position: 'relative',
                    '& > .MuiTreeItem-content::before': dragAndDrop.dragToParent === node.id ? styleBefore : {},
                }}
            >
                {node.children.map((child) => renderTreeItem(child, node.id))}
            </CustomTreeItem>
        );
    }

    return (
        <Fragment>
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                <Button
                    variant='outlined'
                    size='small'
                    LinkComponent={Link}
                    href={EPath.MANAGE_CATEGORY.concat(`/add/${category?.id}`)}
                >
                    Them moi
                </Button>

                <Button variant='contained' size='small' color='warning'>
                    Xoa
                </Button>
            </Paper>

            <Box display='flex' gap={4} mt={2}>
                <TreeView
                    aria-label='category tree'
                    defaultSelected={category?.id.toString() || categoryParent?.id.toString()}
                    defaultExpanded={category?.director.split(',') || categoryParent?.director.split(',')}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleSetSelected}
                    sx={{ flex: 1, height: '100%' }}
                >
                    {categoryTree.map((item) => renderTreeItem(item))}
                </TreeView>

                <Box
                    width='40%'
                    component='form'
                    onSubmit={handleSubmit(handleOnSubmit)}
                    sx={{
                        '& .MuiFormControl-root': { mb: 2 },
                    }}
                >
                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                inputRef={inputNameRef}
                                id='input-name'
                                type='text'
                                label=''
                                placeholder='Nhập tên...'
                                autoComplete='on'
                                size='small'
                                fullWidth
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='path'
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                inputRef={inputNameRef}
                                id='input-path'
                                type='text'
                                label=''
                                placeholder='Url...'
                                autoComplete='on'
                                size='small'
                                fullWidth
                                error={Boolean(errors.path?.message)}
                                helperText={errors.path?.message}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <FormControlLabel
                        label='Bat'
                        control={
                            <Switch
                                inputProps={{ 'aria-label': 'category-status' }}
                                checked={status}
                                onChange={(event) => setStatus(event.target.checked)}
                            />
                        }
                    />

                    <Box mt={2}>
                        <Button type='submit' variant='contained' disabled={disabled}>
                            Luu
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}

export default CategoryTreeView;
