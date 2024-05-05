'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DragEvent, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { categoryServerAction } from '~/actions';
import { ELabel, EPath, EStatus, EText } from '~/common/enums';
import { useEntityStatus } from '~/hooks';
import logger from '~/libs/logger';
import { categoryResolver } from '~/resolvers';
import { categoryFormData } from '~/types/form.data';
import { ICategoryNode } from '~/types/models';
import FormLabel from '../form.label';
import CustomTreeItem from './custom.tree.item';

declare global {
    interface DOMStringMap {
        id: string;
    }
}

interface IDragAndDropStatus {
    type: 'handleDragStart' | 'handleDragOver' | 'handleDragEnter' | 'handleDragEnd' | '';
    dragFrom: number | null;
    dropTo: number | null;
}
interface IProps {
    categoryTree: ICategoryNode[];
    categoryNode?: ICategoryNode;
    parentCategoryNode?: ICategoryNode;
}

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

function CategoryTreeView({ categoryTree, categoryNode, parentCategoryNode }: IProps) {
    const initDragAndDrop = useCallback(() => ({ type: '', dragFrom: null, dropTo: null } as IDragAndDropStatus), []);
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm({
        resolver: categoryResolver,
        defaultValues: { name: categoryNode?.info.name ?? '', path: categoryNode?.info.path ?? '' },
    });
    const [dragAndDrop, setDragAndDrop] = useState(initDragAndDrop);
    const [status, setStatus] = useEntityStatus(categoryNode?.info);
    const [disabled, setDisabled] = useState<boolean>(false);
    const defaultExpanded = useMemo(() => {
        const expanded = categoryNode?.info.code.split('-') ?? parentCategoryNode?.info.code.split('-') ?? ['2'];
        return [...expanded, categoryNode?.info.id.toString() ?? parentCategoryNode?.info.id.toString() ?? '2'];
    }, [categoryNode?.info.code, categoryNode?.info.id, parentCategoryNode?.info.code, parentCategoryNode?.info.id]);
    const router = useRouter();

    const pathDefault = '1';

    const handleSetSelected = (_: SyntheticEvent, nodeId: string) => {
        router.push(EPath.MANAGE_CATEGORY_EDIT.concat(nodeId));
    };
    const handleDragStart = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        const dragFrom = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragStart', dragFrom });
    };
    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
    };
    const handleDragEnter = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        const dropTo = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragEnter', dropTo });
    };
    const handleDragEnd = async () => {
        const { dragFrom, dropTo } = dragAndDrop;
        if (dragFrom !== null && dropTo !== null && dragFrom !== dropTo) {
            const result = await categoryServerAction.move(dragFrom, dropTo);
            logger.info('handle drag::', result);
        }
        setDragAndDrop(initDragAndDrop());
    };

    const handleOnSubmit: SubmitHandler<categoryFormData> = async (data) => {
        setDisabled(true);

        data.parentId = parentCategoryNode?.id;
        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;

        const result = categoryNode
            ? await categoryServerAction.edit(categoryNode.id, data)
            : await categoryServerAction.create(data);

        if (result) {
            setValue('name', result.info.name);
            setValue('path', result.info.path);
            setValue('status', result.info.status);
            setStatus(result.info.status === EStatus.ENABLED);
        }

        setDisabled(false);
    };

    const renderTreeItem = (node: ICategoryNode) => (
        <CustomTreeItem
            key={node.id}
            label={node.info.name.concat(` (ID: ${node.info.id})`)}
            nodeId={node.info.id.toString()}
            data-id={node.id}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            sx={{
                position: 'relative',
                '& > .MuiTreeItem-content::before': dragAndDrop.dropTo === node.id ? styleBefore : {},
            }}
        >
            {node.children.map((child) => renderTreeItem(child))}
        </CustomTreeItem>
    );

    return (
        <Box display='flex' gap={2} mt={2}>
            <Box flex='1'>
                <Box display='flex' alignItems='flex-start' gap={1} mb={2}>
                    <Button
                        variant='outlined'
                        LinkComponent={Link}
                        href={`${EPath.MANAGE_CATEGORY_ADD}${parentCategoryNode?.info.id ?? pathDefault}`}
                    >
                        {EText.ADD_ROOT_CATEGORY}
                    </Button>
                    <Button
                        variant='outlined'
                        LinkComponent={Link}
                        href={`${EPath.MANAGE_CATEGORY_ADD}${categoryNode?.info.id ?? pathDefault}`}
                    >
                        {EText.ADD_SUBCATEGORY}
                    </Button>
                </Box>
                <TreeView
                    aria-label='category tree'
                    defaultSelected={categoryNode?.info.id.toString() || parentCategoryNode?.info.id.toString()}
                    defaultExpanded={defaultExpanded}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleSetSelected}
                    sx={{ flex: 1, height: '100%' }}
                >
                    {categoryTree.map((item) => renderTreeItem(item))}
                </TreeView>
            </Box>

            <Box
                width='60%'
                component='form'
                onSubmit={handleSubmit(handleOnSubmit)}
                sx={{ '& .MuiFormControl-root': { mb: 2 } }}
            >
                <Box display='flex' justifyContent='space-between' gap={3}>
                    <FormLabel
                        id='input-name'
                        required
                        sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 148 }}
                    >
                        {ELabel.CATEGORY_NAME}
                    </FormLabel>
                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onChange } }) => (
                            <TextField
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
                </Box>
                <Box display='flex' justifyContent='space-between' gap={3}>
                    <FormLabel
                        id='input-name'
                        sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 148 }}
                    >
                        URL
                    </FormLabel>
                    <Controller
                        control={control}
                        name='path'
                        render={({ field: { value, onChange } }) => (
                            <TextField
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
                </Box>
                <FormControlLabel
                    label={ELabel.TURN_ON}
                    control={
                        <Switch
                            inputProps={{ 'aria-label': 'category-status' }}
                            checked={status}
                            onChange={(event) => setStatus(event.target.checked)}
                        />
                    }
                    sx={{ marginLeft: 18.5 }}
                />

                <Box mt={2} ml={18.5}>
                    <Button type='submit' variant='contained' disabled={disabled}>
                        {EText.SAVE}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CategoryTreeView;
