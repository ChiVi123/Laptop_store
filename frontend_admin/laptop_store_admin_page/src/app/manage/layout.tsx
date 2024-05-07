import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { PropsWithChildren } from 'react';
import { accountServerAction } from '~/actions';
import { Header, Navigate } from '~/components/manage';
import { AccountProvider } from '~/providers';

async function ManageLayout({ children }: PropsWithChildren) {
    const response = await accountServerAction.profile();
    const widthDrawer = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigate width={widthDrawer} />
            <AccountProvider account={response.payload}>
                <Header width={widthDrawer} />
                <Box
                    component='main'
                    width={`calc(100% - ${widthDrawer}px)`}
                    minHeight='100vh'
                    pb={4}
                    bgcolor='#f0f2f5'
                    overflow='hidden'
                >
                    <Toolbar></Toolbar>
                    {children}
                </Box>
            </AccountProvider>
        </Box>
    );
}

export default ManageLayout;
