import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath, EText } from '~/common/enums';
import CategoryBar from '~/components/manage/category/category.bar';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import logResultError from '~/libs/log.result.error';
import { findOneService } from '~/services';
import { ICategory } from '~/types/models';

interface IProps {
    params: { id: string };
}

async function EditCategoryPage({ params: { id } }: IProps) {
    const [rootCategoryResult, categoryResult] = await Promise.all([
        findOneService.rootCategory(),
        findOneService.categoryById(Number(id)),
    ]);

    if ('error' in rootCategoryResult) {
        logResultError('Root category error::', rootCategoryResult);
        throw new Error(rootCategoryResult.error);
    }
    if ('error' in categoryResult) {
        logResultError('Category detail error::', categoryResult);
        throw new Error(categoryResult.error);
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='/'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chủ
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Danh mục
                    </Typography>
                </Breadcrumbs>
                <Typography variant='h1' mt={1}>
                    {EText.EDIT}
                </Typography>
            </Box>
            <CategoryBar category={categoryResult} />

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={rootCategoryResult.children} category={categoryResult} />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata({ params: { id } }: IProps): Promise<Metadata> {
    const result = await findOneService.categoryById(Number(id));
    const category: ICategory | undefined = 'error' in result ? undefined : result;
    return { title: `${category?.name || ''} (ID: ${category?.id || ''}) | Laptop Store` };
}
export default EditCategoryPage;
