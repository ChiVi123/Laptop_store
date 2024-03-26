'use client';

import { Box, FormHelperText, alpha } from '@mui/material';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from './editor.toolbar';

interface IProps {
    value?: string;
    error: boolean;
    helperText: string;
    onChange: (value: string) => void;
}

function EditorField({ value, error = false, helperText, onChange }: IProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, autolink: true }),
            Image.configure({ inline: true, allowBase64: true }),
        ],
        content: value || '',
        onUpdate({ editor }) {
            onChange(editor.getHTML() === '<p></p>' ? '' : editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <Box>
            <Box
                sx={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: ({ palette }) => (error ? palette.error.main : palette.divider),
                    borderRadius: 1,
                    '& .tiptap': {
                        outline: 'none',
                        px: 3,
                        py: 1,
                        bgcolor: ({ palette }) => alpha(palette.primary.main, 0.1),
                        '& *': { m: 0, lineHeight: 1.5 },
                        '& a': ({ palette }) => palette.primary.main,
                    },
                }}
            >
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
            </Box>
            <Box px={3} mt={1}>
                <FormHelperText error={error}>{helperText}</FormHelperText>
            </Box>
        </Box>
    );
}

export default EditorField;
