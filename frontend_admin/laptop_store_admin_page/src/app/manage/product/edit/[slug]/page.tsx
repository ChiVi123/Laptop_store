import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import ProductForm from '~/components/manage/product/product.form';
import { findOneService } from '~/services';
import { logger, parseError } from '~/utils';

interface IProps {
    params: { slug: string };
}

async function EditProductPage({ params: { slug } }: IProps) {
    const productResult = await findOneService.productBySlug(slug);
    const categoryResult = await findOneService.rootCategory();

    if ('error' in categoryResult) {
        const error = parseError(categoryResult);
        logger({ category: error });
        throw new Error(error.payload.message);
    }

    if ('error' in productResult) {
        const error = parseError(productResult);
        logger({ product: error });
        throw new Error(error.payload.message);
    }

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

            <ProductForm product={productResult} categories={categoryResult.children} />
        </Fragment>
    );
}

export async function generateMetadata({ params: { slug } }: IProps): Promise<Metadata> {
    const result = await findOneService.productBySlug(slug);
    return { title: ''.concat('error' in result ? '' : result.name, ' | Laptop store') };
}
export default EditProductPage;
