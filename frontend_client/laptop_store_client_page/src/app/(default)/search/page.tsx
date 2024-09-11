import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Suspense } from 'react';

import { SearchPagination, Sort, SortSelect } from '~/app/_components';
import { Container, ProductCard } from '~/components';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Button, buttonVariants } from '~/components/ui/button';
import { cn } from '~/libs/utils';
import { searchProduct } from '~/services';

interface IProps {
    searchParams: {
        query: string | undefined;
        sort_by: string | undefined;
        sort_dir: 'asc' | 'desc' | undefined;
        page_number: string | undefined;
    };
}

async function SearchPage({ searchParams }: IProps) {
    const resultSearch = await searchProduct({ ...searchParams, page_size: '10' });
    const page_number = searchParams.page_number;

    return (
        <Container component='main' className='px-0 md:px-4 pt-[3.875rem] pb-8 md:py-[4.625rem]'>
            <Breadcrumb className='hidden md:block'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/' title='Trang chủ' className='hover:underline'>
                            Trang chủ
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Kết quả tìm kiếm &quot;{searchParams.query}&quot;</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='hidden sm:flex justify-between p-3 mt-4 bg-white rounded-t-xl'>
                <span className='text-lg font-semibold'>{searchParams.query}</span>
                <div className='flex items-center gap-x-4'>
                    <div>
                        <span className='text-cv-primary-100'>{resultSearch.pageNumber ?? 1}</span>
                        {' / '}
                        <span>{resultSearch.totalPage}</span>
                    </div>
                    <div className='space-x-1'>
                        <Link
                            aria-label='previous page'
                            href={{
                                pathname: '/search',
                                query: { ...searchParams, page_number: (Number(page_number) ?? 1) - 1 },
                            }}
                            className={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), {
                                'pointer-events-none opacity-50': Number(page_number) === 1,
                            })}
                        >
                            <ChevronLeftIcon />
                        </Link>
                        <Link
                            aria-label='next page'
                            href={{
                                pathname: '/search',
                                query: { ...searchParams, page_number: (Number(page_number) ?? 1) + 1 },
                            }}
                            className={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), {
                                'pointer-events-none opacity-50': Number(page_number) === resultSearch.totalPage,
                            })}
                        >
                            <ChevronRightIcon />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between p-3 mt-1 bg-white'>
                <Suspense>
                    <Sort />
                </Suspense>

                <div className='sm:hidden'>
                    <Suspense>
                        <SortSelect />
                    </Suspense>
                </div>
            </div>

            {!resultSearch.list.length && (
                <div className='flex flex-col items-center justify-center gap-4 mt-6'>
                    <span>Không tìm thấy kết quả nào.</span>
                    <Button asChild>
                        <Link href='/'>Mua sắm ngay</Link>
                    </Button>
                </div>
            )}

            <div className='flex flex-wrap -pl-1 md:pl-0'>
                {resultSearch.list.map((item) => (
                    <div key={item.id} className='pt-1 pl-1 md:p-0 basis-1/2 sm:basis-1/4 lg:basis-1/5'>
                        <ProductCard product={item} className='rounded-none' />
                    </div>
                ))}
            </div>

            {Boolean(resultSearch.list.length) && (
                <div className='flex justify-center mt-6 mb-48'>
                    <Suspense>
                        <SearchPagination totalPage={resultSearch.totalPage} />
                    </Suspense>
                </div>
            )}
        </Container>
    );
}

export default SearchPage;
