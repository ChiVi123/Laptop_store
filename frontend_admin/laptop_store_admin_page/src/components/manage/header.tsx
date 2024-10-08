'use client';

import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { AppBar, Avatar, Button, Divider, Menu, MenuItem, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { EPath } from '~/common/enums';
import { AccountContext } from '~/config';
import { apiRequest } from '~/libs';

type responseType = {
    message: string;
    path: EPath;
};

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
        children: name[0],
    };
}

function Header({ width }: { width: number }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const account = useContext(AccountContext);
    const router = useRouter();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleProfile = () => {
        router.push(EPath.MANAGE_PROFILE);
    };
    const handleLogout = async () => {
        const result = await apiRequest.get('api/auth/logout', { baseURL: '' }).json<responseType>();
        router.push(result.path);
    };

    return (
        <AppBar sx={{ left: width, width: 'auto', backgroundColor: 'white' }}>
            <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
                {/* <IconButton>
                    <Badge badgeContent={2} color='warning'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton> */}
                <Button
                    id='profile-menu-button'
                    variant='outlined'
                    disableRipple
                    startIcon={<Avatar {...stringAvatar(account?.fullName ?? '')} />}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ color: ({ palette }) => palette.grey[600], borderRadius: '999px' }}
                    onClick={handleOpenMenu}
                >
                    {account?.fullName ?? ''}
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
                    <MenuItem onClick={handleProfile}>Tài khoản</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
