import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import FormAccount from '~/components/manage/profile/form.account';

function ProfilePage() {
    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tai khoan
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Tai khoan
                </Typography>
            </Box>

            <FormAccount />
        </Fragment>
    );
}

export default ProfilePage;

export const metadata: Metadata = {
    title: 'Account | Laptop store',
};
