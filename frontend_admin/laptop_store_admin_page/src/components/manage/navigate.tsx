'use client';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { lists } from '~/common/lists';
import { INavigateItem } from '~/types/lists';

interface IProps {
    width: number;
}

function Navigate({ width }: IProps) {
    const { palette } = useTheme();
    const pathname = usePathname();
    const themeNavigate = palette.augmentColor({ color: { main: '#06103b' } }).dark;

    function checkPath(path: string | undefined, children?: Omit<INavigateItem, 'icon'>[]): boolean {
        return pathname === path || (!!children && children.some((value) => pathname === value.url));
    }

    function navigateList() {
        return (
            <Fragment>
                {lists.navigateItems.map((navigate, index) => (
                    <ListItem key={index} disablePadding>
                        <Accordion elevation={0} sx={{ width: '100%', backgroundColor: 'transparent' }}>
                            <AccordionSummary
                                expandIcon={navigate.children.length ? <ExpandMoreIcon /> : <Fragment />}
                                sx={{
                                    minHeight: '0 !important',
                                    px: 2,
                                    py: 1,
                                    color: checkPath(navigate.url, navigate.children) ? palette.info.main : '#dbdbdb',
                                    '.MuiAccordionSummary-expandIconWrapper': { color: '#dbdbdb' },
                                    '.Mui-expanded': { m: '0 !important' },
                                    '.MuiAccordionSummary-content': { m: '0 !important' },
                                    '&:hover': { backgroundColor: palette.info.main, color: '#dbdbdb' },
                                }}
                            >
                                <ListItemButton
                                    disableRipple
                                    LinkComponent={Link}
                                    href={navigate.url || ''}
                                    sx={{
                                        p: 0,
                                        '&:hover': { backgroundColor: 'inherit', color: 'inherit' },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>{navigate.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={navigate.content}
                                        sx={{ fontSize: '0.875rem', color: 'inherit' }}
                                    />
                                </ListItemButton>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                {navigate.children.map((child, indexChild) => (
                                    <ListItemButton
                                        key={indexChild}
                                        disableRipple
                                        LinkComponent={Link}
                                        href={child.url || ''}
                                        sx={{
                                            pl: 6,
                                            color: checkPath(child.url) ? palette.info.main : '#dbdbdb',
                                            '&:hover': { backgroundColor: palette.primary.main, color: '#dbdbdb' },
                                        }}
                                    >
                                        <ListItemText
                                            primary={child.content}
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'inherit',
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))}
            </Fragment>
        );
    }

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            sx={{
                width,
                '& .MuiDrawer-paper': {
                    width,
                    pb: 2,
                    backgroundColor: themeNavigate,
                },
            }}
        >
            <Toolbar></Toolbar>
            <Divider sx={{ backgroundColor: palette.border.main }} />
            <nav>
                <List>{navigateList()}</List>
            </nav>
        </Drawer>
    );
}

export default Navigate;
