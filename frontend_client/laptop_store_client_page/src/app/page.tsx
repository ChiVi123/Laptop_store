import '~/libs/extension.number';

import Image from 'next/image';
import { Fragment } from 'react';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { getAllProduct } from '~/services/product';

async function HomePage() {
    const result = await getAllProduct();
    return (
        <Fragment>
            <Carousel className='w-full'>
                <CarouselContent className='-ml-2.5'>
                    {result.list.map((item) => (
                        <CarouselItem key={item.id} className='pl-2.5 md:basis-1/2 lg:basis-1/5'>
                            <Card className='h-full p-1 rounded-sm shadow-none'>
                                <CardHeader className='p-2'>
                                    <AspectRatio ratio={1}>
                                        <Image
                                            src={item.thumbnailUrl}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            priority
                                            className='rounded-t-sm'
                                        />
                                    </AspectRatio>
                                </CardHeader>
                                <CardContent className='p-2'>
                                    <CardTitle
                                        title={item.name}
                                        className='h-12 mb-0.5 text-base text-cv-gray-100 font-normal break-words line-clamp-2'
                                    >
                                        {item.name}
                                    </CardTitle>

                                    <span className='text-cv-primary-100 font-semibold'>{item.price.toCurrency()}</span>
                                </CardContent>
                                <CardFooter className='flex justify-center p-2'>
                                    <Button
                                        variant='outline'
                                        className='min-w-24 border-cv-primary-100 text-cv-primary-100 hover:bg-cv-primary-10 hover:text-cv-primary-200'
                                    >
                                        Thêm giỏ hàng
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Buttons */}
                <CarouselPrevious type='button' aria-label='carousel button previous' className='left-0' />
                <CarouselNext type='button' aria-label='carousel button next' className='right-0' />
            </Carousel>
        </Fragment>
    );
}
export default HomePage;
