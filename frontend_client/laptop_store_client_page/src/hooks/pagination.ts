'use client';

import { useMemo } from 'react';
import { range } from '~/libs/utils';

interface IPaginationProps {
    page: number;
    boundary: number;
    sibling: number;
    pageCount: number;
}
type Page = number | 'start-ellipsis' | 'end-ellipsis';

// structure pagination
// [boundary] [number | "ellipsis"] pages [number | "ellipsis"] [boundary]

/**
 A Client Component pagination.
 *
 * @param props.page the current page.
 * @param props.boundary number of always visible pages at the beginning and end.
 * @param props.sibling number of always visible pages before and after the current page.
 * @param props.pageCount the total number of pages.
 *
 * @returns [boundary, ellipsis, centerPages, ellipsis, boundary]
 */
export const usePagination = (props: IPaginationProps): Page[] => {
    const { page = 1, boundary = 1, sibling = 1, pageCount = 1 } = props;

    const rangeDisplay = useMemo(() => sibling * 2 + 1, [sibling]);

    const startPages = useMemo(() => range(1, Math.min(boundary, pageCount)), [boundary, pageCount]);
    const endPages = useMemo(
        () => range(Math.max(pageCount - boundary + 1, boundary + 1), pageCount),
        [boundary, pageCount],
    );

    const whenPageIsHigh = useMemo(() => pageCount - boundary - rangeDisplay, [boundary, pageCount, rangeDisplay]);
    const whenPageIsLow = useMemo(() => boundary + rangeDisplay + 1, [boundary, rangeDisplay]);

    const greaterThanStartPages = useMemo(() => boundary + 2, [boundary]);
    const lessThanEndPages = useMemo(() => pageCount - boundary - 1, [boundary, pageCount]);

    const naturalStart = page - sibling;
    const naturalEnd = page + sibling;

    const rangeStart = Math.max(Math.min(naturalStart, whenPageIsHigh), greaterThanStartPages);
    const rangeEnd = Math.min(Math.max(naturalEnd, whenPageIsLow), lessThanEndPages);

    const isStartEllipsis = rangeStart > boundary + 2;
    const isEndEllipsis = rangeEnd < pageCount - boundary - 1;

    const startEllipsis: Page[] = isStartEllipsis
        ? ['start-ellipsis']
        : boundary + 1 < pageCount - boundary
        ? [boundary + 1]
        : [];
    const endEllipsis: Page[] = isEndEllipsis
        ? ['end-ellipsis']
        : pageCount - boundary > boundary
        ? [pageCount - boundary]
        : [];
    const centerPages = range(rangeStart, rangeEnd);

    return [...startPages, ...startEllipsis, ...centerPages, ...endEllipsis, ...endPages];
};
