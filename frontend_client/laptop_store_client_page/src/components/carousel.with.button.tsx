import { PropsWithChildren } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';

interface IProps {
    className?: { root?: string; content?: string };
}

function CarouselWithButton({ children, className }: PropsWithChildren<IProps>) {
    return (
        <Carousel className={className?.root}>
            <CarouselContent className={className?.content}>{children}</CarouselContent>

            {/* Buttons */}
            <CarouselPrevious type='button' aria-label='crs-btn-previous' className='left-0' />
            <CarouselNext type='button' aria-label='crs-btn-next' className='right-0' />
        </Carousel>
    );
}

export default CarouselWithButton;
