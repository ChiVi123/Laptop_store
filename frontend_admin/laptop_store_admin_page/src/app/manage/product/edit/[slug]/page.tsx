import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import ProductForm from '~/components/manage/product/add/product.form';
import { findAllBrand, findAllCategoryRoot } from '~/services/find.all';
import { findProductBySlug } from '~/services/find.one';

interface IProps {
    params: { slug: string };
}

async function EditProductPage({ params: { slug } }: IProps) {
    const productResponse = await findProductBySlug(slug);
    const [brandResponse, categoryResponse] = await Promise.all([findAllBrand(), findAllCategoryRoot()]);

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Chinh sua sản phẩm
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Chinh sua sản phẩm
                </Typography>
            </Box>

            <ProductForm
                product={productResponse.data}
                brands={brandResponse && 'data' in brandResponse ? brandResponse.data : []}
                categories={categoryResponse && 'data' in categoryResponse ? categoryResponse.data : []}
            />
        </Fragment>
    );
}

export async function generateMetadata({ params: { slug } }: IProps): Promise<Metadata> {
    const result = await findProductBySlug(slug);

    return {
        title: ''.concat(result.data.name, ' | Laptop store'),
    };
}
export default EditProductPage;
