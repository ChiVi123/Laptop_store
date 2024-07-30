import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { ButtonProps, buttonVariants } from '~/components/ui/button';
import { cn } from '~/libs/utils';

interface IPaginationLinkProps extends Pick<ButtonProps, 'size' | 'disabled'>, LinkProps {
    isActive?: boolean;
    className?: string;
    children?: ReactNode;
}

function CustomPaginationLink({ className, isActive, disabled, size = 'icon', ...props }: IPaginationLinkProps) {
    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
                { 'pointer-events-none opacity-50': disabled },
                className,
            )}
            {...props}
        />
    );
}

function CustomPaginationPrevious({ className, ...props }: IPaginationLinkProps) {
    return (
        <CustomPaginationLink
            aria-label='Go to next page'
            size='default'
            className={cn('gap-1 pr-2.5', className)}
            {...props}
        >
            <ChevronLeftIcon className='size-4' />
            <span>Previous</span>
        </CustomPaginationLink>
    );
}

function CustomPaginationNext({ className, ...props }: IPaginationLinkProps) {
    return (
        <CustomPaginationLink
            aria-label='Go to next page'
            size='default'
            className={cn('gap-1 pr-2.5', className)}
            {...props}
        >
            <span>Next</span>
            <ChevronRightIcon className='size-4' />
        </CustomPaginationLink>
    );
}

export { CustomPaginationLink, CustomPaginationNext, CustomPaginationPrevious };
