import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { CarouselWithButton, Container, ProductCard } from '~/components';
import { CarouselItem } from '~/components/ui/carousel';
import { getDataHomePage } from '~/services';

async function HomePage() {
    const result = await getDataHomePage([3, 5]);
    return (
        <Container component='main' className='px-0 md:px-4 pt-[3.875rem] pb-8 md:py-[4.625rem]'>
            {result.map((section, index) => (
                <div key={index} className='px-4 py-1 md:py-4 mb-8 bg-white md:rounded-sm'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-lg font-semibold text-cv-gray-200'>{section.title}</span>

                        <Link href='' className='group flex items-center gap-0.5 text-cv-primary-100'>
                            <span className='text-inherit group-hover:underline'>Xem thêm</span>
                            <ChevronRightIcon className='size-4 mt-0.5 group-hover:translate-x-1 transition-transform' />
                        </Link>
                    </div>

                    <CarouselWithButton dragFree className={{ content: '-ml-2.5' }}>
                        {section.list.map((item) => (
                            <CarouselItem
                                key={`${section.title}-${item.id}`}
                                className='pl-2.5 basis-1/2 md:basis-1/3 lg:basis-1/5'
                            >
                                <ProductCard product={item} />
                            </CarouselItem>
                        ))}
                    </CarouselWithButton>
                </div>
            ))}
        </Container>
    );
}
export default HomePage;
