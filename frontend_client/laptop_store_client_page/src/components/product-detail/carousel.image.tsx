'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { IImage } from '~/types/models';
import { AspectRatio } from '../ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface IProps {
    alt: string;
    images: IImage[];
}

function CarouselImage({ alt, images }: IProps) {
    const [src, setSrc] = useState(images[0].secureUrl);

    return (
        <Fragment>
            <AspectRatio ratio={1} className='p-4 mb-2 border border-border rounded-t-md'>
                <Image src={src} alt={alt} width={200} height={200} priority className='w-full h-full' />
            </AspectRatio>

            <Carousel>
                <CarouselContent className='-ml-2.5'>
                    {images.map((image) => (
                        <CarouselItem
                            key={image.publicId}
                            className='pl-2.5 basis-1/3 lg:basis-1/5 cursor-pointer'
                            onClick={() => setSrc(image.secureUrl)}
                        >
                            <AspectRatio
                                ratio={1}
                                className={clsx('p-0.5 border rounded-sm', {
                                    'border-cv-primary-90': image.secureUrl === src,
                                })}
                            >
                                <Image
                                    src={image.secureUrl}
                                    alt={image.publicId}
                                    width={60}
                                    height={60}
                                    priority
                                    className='w-full h-full'
                                />
                            </AspectRatio>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Buttons */}
                <CarouselPrevious type='button' aria-label='crs-btn-prev' className='left-0' />
                <CarouselNext type='button' aria-label='crs-btn-next' className='right-0' />
            </Carousel>
        </Fragment>
    );
}

export default CarouselImage;
