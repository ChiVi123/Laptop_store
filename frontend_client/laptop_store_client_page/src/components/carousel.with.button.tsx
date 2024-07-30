import { PropsWithChildren } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';

interface IProps {
    dragFree?: boolean;
    className?: { root?: string; content?: string };
}

function CarouselWithButton({ dragFree, children, className }: PropsWithChildren<IProps>) {
    return (
        <Carousel opts={{ dragFree }} className={className?.root}>
            <CarouselContent className={className?.content}>{children}</CarouselContent>

            {/* Buttons */}
            <CarouselPrevious type='button' aria-label='crs-btn-previous' className='left-0' />
            <CarouselNext type='button' aria-label='crs-btn-next' className='right-0' />
        </Carousel>
    );
}

export default CarouselWithButton;
