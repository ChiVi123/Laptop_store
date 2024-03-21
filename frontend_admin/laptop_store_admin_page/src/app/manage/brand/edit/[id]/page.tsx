import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import BrandForm from '~/components/manage/brand/brand.form';
import { findBrandById } from '~/services/find.one';

interface IProps {
    params: { id: string };
}

async function EditBrandPage({ params: { id } }: IProps) {
    const result = await findBrandById(Number(id));
    return (
        <Fragment>
            <Box p='18px 24px 12px' mb={2} bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tạo thương hiệu
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Tạo thương hiệu
                </Typography>
            </Box>

            <BrandForm brand={result.data} />
        </Fragment>
    );
}

export async function generateMetadata({ params: { id } }: IProps): Promise<Metadata> {
    const result = await findBrandById(Number(id));

    return {
        title: ''.concat(result.data.name, ' | Laptop store'),
    };
}
export default EditBrandPage;
