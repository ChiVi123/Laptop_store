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
import { findOneService } from '~/services';
import { ICategory } from '~/types/models';
import { logger, parseError } from '~/utils';

interface IProps {
    params: { id: string };
}

async function EditCategoryPage({ params: { id } }: IProps) {
    const resultRootCategory = await findOneService.rootCategory();
    const resultCategory = await findOneService.categoryById(Number(id));

    if ('error' in resultRootCategory) {
        const error = parseError(resultRootCategory);
        logger({ error });
        throw new Error(error.payload.message);
    }
    if ('error' in resultCategory) {
        const error = parseError(resultCategory);
        logger({ error });
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
                        Danh mục
                    </Typography>
                </Breadcrumbs>
                <Typography variant='h1' mt={1}>
                    {EText.EDIT}
                </Typography>
            </Box>
            {!('error' in resultCategory) && <CategoryBar category={resultCategory} />}

            <Box px={3} py={2}>
                <CategoryTreeView categoryTree={resultRootCategory.children} category={resultCategory} />
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
