'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DragEvent, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ELabel, EPath, EStatus, EText } from '~/common/enums';
import { categoryResolver } from '~/resolvers';
import { categoryService } from '~/services';
import { categoryFormData } from '~/types/form.data';
import { ICategory } from '~/types/models';
import { logger, parseError } from '~/utils';
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
    categoryTree: ICategory[];
    category?: ICategory;
    categoryParent?: ICategory;
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

function CategoryTreeView({ categoryTree, category, categoryParent }: IProps) {
    const initDragAndDrop = useCallback(() => ({ type: '', dragFrom: null, dropTo: null } as IDragAndDropStatus), []);
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: categoryResolver,
        defaultValues: { name: category?.name || '', path: category?.path || '' },
    });
    const [dragAndDrop, setDragAndDrop] = useState(initDragAndDrop);
    const [status, setStatus] = useState<boolean>(() => Boolean(category ? category.status === EStatus.ENABLED : true));
    const [disabled, setDisabled] = useState<boolean>(false);
    const router = useRouter();
    const defaultExpanded = useMemo(() => {
        const expanded = category?.director.split(',') || categoryParent?.director.split(',') || [];
        if (category) {
            expanded.push(category.id.toString());
        }
        if (categoryParent) {
            expanded.push(categoryParent.id.toString());
        }
        return expanded;
    }, [category, categoryParent]);
    const pathDefault = '0';

    function handleSetSelected(_: SyntheticEvent, nodeId: string) {
        router.push(EPath.MANAGE_CATEGORY_EDIT.concat(nodeId));
    }
    function handleDragStart(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dragFrom = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragStart', dragFrom });
    }
    function handleDragOver(event: DragEvent<HTMLElement>) {
        event.preventDefault();
    }
    function handleDragEnter(event: DragEvent<HTMLElement>) {
        event.stopPropagation();
        const dropTo = Number(event.currentTarget.dataset.id);
        setDragAndDrop({ ...dragAndDrop, type: 'handleDragEnter', dropTo });
    }
    async function handleDragEnd() {
        const { dragFrom, dropTo } = dragAndDrop;
        if (dragFrom !== null && dropTo !== null && dragFrom !== dropTo) {
            const result = await categoryService.move(dragFrom, dropTo);
            logger({ error: typeof result === 'string' ? result : parseError(result) });
        }
        setDragAndDrop(initDragAndDrop());
    }

    const handleOnSubmit: SubmitHandler<categoryFormData> = async (data) => {
        setDisabled(true);

        data.parentId = categoryParent?.id;
        data.status = status ? EStatus.ENABLED : EStatus.DISABLED;

        const result = category ? await categoryService.edit(category.id, data) : await categoryService.create(data);
        if ('error' in result) {
            logger({ error: parseError(result) });
        } else {
            router.push(EPath.MANAGE_CATEGORY_EDIT.concat(result.id.toString()));
        }

        setDisabled(false);
    };

    function renderTreeItem(node: ICategory) {
        return (
            <CustomTreeItem
                key={node.id}
                id={`parent-${node.id}`}
                nodeId={node.id.toString()}
                label={node.name.concat(` (ID: ${node.id})`)}
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
    }

    return (
        <Box display='flex' gap={2} mt={2}>
            <Box flex='1'>
                <Box display='flex' alignItems='flex-start' gap={1} mb={2}>
                    <Button
                        variant='outlined'
                        LinkComponent={Link}
                        href={EPath.MANAGE_CATEGORY_ADD.concat(pathDefault)}
                    >
                        {EText.ADD_ROOT_CATEGORY}
                    </Button>
                    <Button
                        variant='outlined'
                        LinkComponent={Link}
                        href={EPath.MANAGE_CATEGORY_ADD.concat((category ? category.id : pathDefault).toString())}
                    >
                        {EText.ADD_SUBCATEGORY}
                    </Button>
                </Box>
                <TreeView
                    aria-label='category tree'
                    defaultSelected={category?.id.toString() || categoryParent?.id.toString()}
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
