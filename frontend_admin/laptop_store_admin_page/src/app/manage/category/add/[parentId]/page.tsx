import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { EPath } from '~/common/enums';
import CategoryTreeView from '~/components/manage/category/category.tree.view';
import logResultError from '~/libs/log.result.error';
import { findOneService } from '~/services';
import { ICategory } from '~/types/models';

interface IProps {
    params: { parentId: string };
}

async function AddSubCategoryPage({ params: { parentId } }: IProps) {
    const [rootCategoryResult, categoryResult] = await Promise.all([
        findOneService.rootCategory(),
        findOneService.categoryById(Number(parentId)),
    ]);

    if ('error' in rootCategoryResult) {
        logResultError('Root category error::', rootCategoryResult);
        throw new Error(rootCategoryResult.error);
    }
    if ('error' in categoryResult) {
        logResultError('Parent category error::', categoryResult);
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
                        Tạo danh mục
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={rootCategoryResult.children} parentCategory={categoryResult} />
            </Box>
        </Fragment>
    );
}

export async function generateMetadata({ params: { parentId } }: IProps): Promise<Metadata> {
    const result = await findOneService.categoryById(Number(parentId));
    const category: ICategory | undefined = 'error' in result ? undefined : result;
    return { title: `${category?.name || ''} (ID: ${category?.id || ''}) | Laptop Store` };
}
export default AddSubCategoryPage;
