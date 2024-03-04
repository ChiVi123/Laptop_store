'use client';

import {
    FormatAlignCenter as FormatAlignCenterIcon,
    FormatAlignJustify as FormatAlignJustifyIcon,
    FormatAlignLeft as FormatAlignLeftIcon,
    FormatAlignRight as FormatAlignRightIcon,
    FormatBold as FormatBoldIcon,
    FormatClear as FormatClearIcon,
    FormatItalic as FormatItalicIcon,
    FormatListBulleted as FormatListBulletedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    FormatUnderlined as FormatUnderlinedIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Redo as RedoIcon,
    StrikethroughS as StrikethroughSIcon,
    Undo as UndoIcon,
} from '@mui/icons-material';
import { Button, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Toolbar, styled } from '@mui/material';
import { Editor } from '@tiptap/react';
import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';

interface IProps {
    editor: Editor;
}
type Level = 1 | 2 | 3 | 4 | 5 | 6;

const StyleVisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const StyleFormatButton = styled(Button)(({ theme: { palette } }) => ({
    minWidth: 'auto',
    padding: 7,
    color: palette.action.active,
    borderColor: palette.divider,
    '&:hover': {
        borderColor: palette.divider,
        backgroundColor: palette.action.hover,
    },
    '& .MuiButton-startIcon': { margin: 0 },
    '& .MuiSvgIcon-root': { fontSize: '20px !important' },
}));

function EditorToolbar({ editor }: IProps) {
    const [alignment, setAlignment] = useState<string>('left');
    const buttonImageProps = { component: 'label' };

    const checkFormatType = useCallback(
        function () {
            return Array.from({ length: 7 }, (_, i) => i).find((item) => {
                return editor.isActive('heading', { level: item });
            });
        },
        [editor],
    );

    const handleFormatType = useCallback(
        function (event: ChangeEvent<HTMLInputElement>) {
            const level = parseInt(event.target.value);
            if (level > 0 && level <= 6) {
                editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as Level })
                    .run();
            } else {
                editor.chain().focus().setParagraph().run();
            }
        },
        [editor],
    );
    const handleChangeAlign = useCallback(
        function (_: MouseEvent<HTMLElement>, newAlignment: string) {
            setAlignment(newAlignment);
            editor.chain().focus().setTextAlign(newAlignment).run();
        },
        [editor],
    );
    const handleFormatMarked = useCallback(
        function (_: MouseEvent<HTMLElement>, formatMarked: string) {
            switch (formatMarked) {
                case 'italic':
                    editor.chain().focus().toggleItalic().run();
                    break;

                case 'underline':
                    editor.chain().focus().toggleUnderline().run();
                    break;

                case 'strikeThrough':
                    editor.chain().focus().toggleStrike().run();
                    break;

                case 'bold':
                default:
                    editor.chain().focus().toggleBold().run();
                    break;
            }
        },
        [editor],
    );
    const handleFormatList = useCallback(
        function (_: MouseEvent<HTMLElement>, formatList: string) {
            switch (formatList) {
                case 'orderedList':
                    editor.chain().focus().toggleOrderedList().run();
                    break;

                case 'bulletList':
                default:
                    editor.chain().focus().toggleBulletList().run();
                    break;
            }
        },
        [editor],
    );
    const handleFormatLink = useCallback(
        function () {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);

            // cancelled
            if (url === null) {
                return;
            }

            // empty
            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }

            // update link
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        },
        [editor],
    );
    const handleFormatImage = useCallback(
        function (event: ChangeEvent<HTMLInputElement>) {
            if (event.target.files) {
                const file = event.target.files.item(0);
                const reader = new FileReader();

                reader.onloadend = function () {
                    if (typeof reader.result === 'string') {
                        editor.chain().focus().setImage({ src: reader.result }).run();
                    }
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
        },
        [editor],
    );
    function handleUndo() {
        editor.chain().focus().undo().run();
    }
    function handleRedo() {
        editor.chain().focus().redo().run();
    }
    function handleClearFormat() {
        editor.chain().focus().unsetAllMarks().run();
        editor.commands.clearNodes();
    }

    return (
        <Toolbar sx={{ gap: 1 }}>
            <TextField
                id='select-type'
                size='small'
                fullWidth
                select
                value={checkFormatType() || 0}
                inputProps={{ id: 'select-type-input' }}
                onChange={handleFormatType}
                sx={{ minWidth: 160 }}
            >
                <MenuItem value={3} sx={(theme) => theme.typography.h3}>
                    Heading 1
                </MenuItem>
                <MenuItem value={4} sx={(theme) => theme.typography.h4}>
                    Heading 2
                </MenuItem>
                <MenuItem value={5} sx={(theme) => theme.typography.h5}>
                    Heading 3
                </MenuItem>
                <MenuItem value={0} sx={(theme) => theme.typography.body2}>
                    Body
                </MenuItem>
            </TextField>

            <ToggleButtonGroup
                aria-label='alignment'
                size='small'
                value={alignment}
                exclusive
                onChange={handleChangeAlign}
            >
                <ToggleButton aria-label='button-format' value='left'>
                    <FormatAlignLeftIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton aria-label='button-format' value='center'>
                    <FormatAlignCenterIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton aria-label='button-format' value='right'>
                    <FormatAlignRightIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton aria-label='button-format' value='justify'>
                    <FormatAlignJustifyIcon fontSize='small' />
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup size='small'>
                <ToggleButton
                    aria-label='button-format'
                    value='bold'
                    selected={editor.isActive('bold')}
                    onChange={handleFormatMarked}
                >
                    <FormatBoldIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton
                    aria-label='button-format'
                    value='italic'
                    selected={editor.isActive('italic')}
                    onChange={handleFormatMarked}
                >
                    <FormatItalicIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton
                    aria-label='button-format'
                    value='underline'
                    selected={editor.isActive('underline')}
                    onChange={handleFormatMarked}
                >
                    <FormatUnderlinedIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton
                    aria-label='button-format'
                    value='strikeThrough'
                    selected={editor.isActive('strike')}
                    onChange={handleFormatMarked}
                >
                    <StrikethroughSIcon fontSize='small' />
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup size='small'>
                <ToggleButton
                    aria-label='button-format'
                    value='bulletList'
                    selected={editor.isActive('bulletList')}
                    onChange={handleFormatList}
                >
                    <FormatListBulletedIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton
                    aria-label='button-format'
                    value='orderedList'
                    selected={editor.isActive('orderedList')}
                    onChange={handleFormatList}
                >
                    <FormatListNumberedIcon fontSize='small' />
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButton
                aria-label='button-format'
                value='link'
                size='small'
                selected={editor.isActive('link')}
                onChange={handleFormatLink}
            >
                <LinkIcon fontSize='small' />
            </ToggleButton>

            <StyleFormatButton
                aria-label='button-format'
                variant='outlined'
                size='small'
                role={undefined}
                tabIndex={-1}
                startIcon={<ImageIcon fontSize='small' />}
                {...buttonImageProps}
            >
                <StyleVisuallyHiddenInput type='file' onChange={handleFormatImage} />
            </StyleFormatButton>

            <StyleFormatButton
                aria-label='button-format'
                variant='outlined'
                size='small'
                startIcon={<UndoIcon fontSize='small' />}
                onClick={handleUndo}
            />

            <StyleFormatButton
                aria-label='button-format'
                variant='outlined'
                size='small'
                startIcon={<RedoIcon fontSize='small' />}
                onClick={handleRedo}
            />

            <StyleFormatButton
                aria-label='button-format'
                variant='outlined'
                size='small'
                startIcon={<FormatClearIcon fontSize='small' />}
                onClick={handleClearFormat}
            />
        </Toolbar>
    );
}

export default EditorToolbar;
