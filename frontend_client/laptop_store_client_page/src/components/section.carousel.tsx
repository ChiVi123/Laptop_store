import { PropsWithChildren } from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';

function SectionCarousel({ children }: PropsWithChildren) {
    return (
        <Carousel className='w-full'>
            <CarouselContent className='-ml-2.5'>{children}</CarouselContent>

            {/* Buttons */}
            <CarouselPrevious type='button' aria-label='carousel button previous' className='left-0' />
            <CarouselNext type='button' aria-label='carousel button next' className='right-0' />
        </Carousel>
    );
}

export default SectionCarousel;
