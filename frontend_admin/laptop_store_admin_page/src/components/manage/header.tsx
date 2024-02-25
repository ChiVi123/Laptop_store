'use client';

import {
    KeyboardArrowDown as KeyboardArrowDownIconMUI,
    Notifications as NotificationsIconMUI,
} from '@mui/icons-material';
import { AppBar, Avatar, Badge, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState } from 'react';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            width: '24px',
            height: '24px',
            bgcolor: stringToColor(name),
            fontSize: '0.625rem !important',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function Header({ width }: { width: number }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
    }

    return (
        <AppBar sx={{ left: width, width: 'auto', backgroundColor: 'white' }}>
            <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
                <IconButton>
                    <Badge badgeContent={2} color='warning'>
                        <NotificationsIconMUI />
                    </Badge>
                </IconButton>
                <Button
                    id='profile-menu-button'
                    variant='outlined'
                    disableRipple
                    startIcon={<Avatar {...stringAvatar('I Love You')} />}
                    endIcon={<KeyboardArrowDownIconMUI />}
                    sx={{ color: ({ palette }) => palette.grey[600], borderRadius: '999px' }}
                    onClick={handleOpenMenu}
                >
                    I love you
                </Button>
                <Menu
                    id='profile-menu-content'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{ mt: 1.5, '& .MuiPaper-root': { minWidth: 180 } }}
                >
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
