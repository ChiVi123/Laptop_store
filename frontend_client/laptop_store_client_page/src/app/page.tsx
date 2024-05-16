import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Fragment } from 'react';
import { CarouselWithButton, ProductCard } from '~/components';
import { CarouselItem } from '~/components/ui/carousel';
import { getDataHomePage } from '~/services/product';

async function HomePage() {
    const result = await getDataHomePage([8, 15]);
    return (
        <Fragment>
            {result.map((section, index) => (
                <div key={index} className='p-4 mb-8 bg-white rounded-sm'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-lg font-semibold text-cv-gray-200'>{section.title}</span>
                        <Link href='' className='group flex items-center gap-0.5 text-cv-primary-100'>
                            <span className='text-inherit group-hover:underline'>Xem thêm</span>
                            <ChevronRightIcon className='w-4 h-4 mt-0.5 group-hover:translate-x-1 transition-transform' />
                        </Link>
                    </div>
                    <CarouselWithButton className={{ content: '-ml-2.5' }}>
                        {section.list.map((item) => (
                            <CarouselItem
                                key={`${section.title}-${item.id}`}
                                className='pl-2.5 md:basis-1/2 lg:basis-1/5'
                            >
                                <ProductCard product={item} />
                            </CarouselItem>
                        ))}
                    </CarouselWithButton>
                </div>
            ))}
        </Fragment>
    );
}
export default HomePage;
