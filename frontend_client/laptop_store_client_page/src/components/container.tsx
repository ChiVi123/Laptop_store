import { ElementType, PropsWithChildren } from 'react';
import { cn } from '~/libs/utils';

interface IProps {
    component?: ElementType;
    className?: string;
}

function Container({ children, component = 'div', className }: PropsWithChildren<IProps>) {
    const Component = component;
    return <Component className={cn('max-w-7xl px-4 lg:px-[2.125rem] mx-auto', className)}>{children}</Component>;
}

export default Container;
