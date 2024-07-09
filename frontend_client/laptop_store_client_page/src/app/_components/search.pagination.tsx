'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '~/components/ui/pagination';
import { usePagination } from '~/hooks';
import { CustomPaginationLink, CustomPaginationNext, CustomPaginationPrevious } from './pagination.link';

interface IProps {
    boundary?: number;
    totalPage: number;
}

function SearchPagination({ boundary = 1, totalPage }: IProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page_number = Number(searchParams.get('page_number') ?? '1');

    const createQueryString = useCallback(
        (value: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page_number', value.toString());
            return params.toString();
        },
        [searchParams],
    );

    const itemPages = usePagination({ boundary, page: page_number, pageCount: totalPage, sibling: 2 });

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <CustomPaginationPrevious
                        href={pathname + '?' + createQueryString(page_number - 1)}
                        disabled={page_number === 1}
                    />
                </PaginationItem>

                {itemPages.map((page) => {
                    if (typeof page === 'number') {
                        return (
                            <PaginationItem key={'page-' + page}>
                                <CustomPaginationLink
                                    href={pathname + '?' + createQueryString(page)}
                                    isActive={page === page_number}
                                >
                                    {page}
                                </CustomPaginationLink>
                            </PaginationItem>
                        );
                    } else {
                        return (
                            <PaginationItem key={'page-' + page}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                })}

                <PaginationItem>
                    <CustomPaginationNext
                        href={pathname + '?' + createQueryString(page_number + 1)}
                        disabled={page_number === totalPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default SearchPagination;
