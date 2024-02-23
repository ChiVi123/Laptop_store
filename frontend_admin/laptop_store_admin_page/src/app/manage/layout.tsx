import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Header from '~/components/manage.header';
import Navigate from '~/components/manage.navigate';
import { IOnlyChildren } from '~/types/props';

function ManageLayout({ children }: IOnlyChildren) {
    const widthDrawer = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigate width={widthDrawer} />
            <Header width={widthDrawer} />
            <Box
                component='main'
                sx={{ width: `calc(100% - ${widthDrawer}px)`, pb: 4, minHeight: '100vh', bgcolor: '#f0f2f5' }}
            >
                <Toolbar></Toolbar>
                {children}
            </Box>
        </Box>
    );
}

export default ManageLayout;
