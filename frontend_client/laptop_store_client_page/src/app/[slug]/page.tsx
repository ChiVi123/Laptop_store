import '~/libs/extension.number';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Button } from '~/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { Separator } from '~/components/ui/separator';
import { getProductBySlug } from '~/services/product';

interface IProps {
    params: { slug: string };
}

async function ProductDetailPage({ params: { slug } }: IProps) {
    const result = await getProductBySlug(slug);
    const { info: productInfo } = result;
    const [category] = result.categories;
    // logger.info('category::', result.categories);
    return (
        <Fragment>
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/c/${category.path}`}>{category.name}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>{productInfo.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex gap-6'>
                <div className='w-[75%] space-y-10'>
                    <div className='flex justify-between gap-6'>
                        <div className='w-[22rem] p-4 rounded-md bg-white'>
                            <Carousel className='border border-border rounded-t-md'>
                                <CarouselContent>
                                    {result.images.map((image) => (
                                        <CarouselItem key={image.publicId}>
                                            <AspectRatio ratio={1}>
                                                <Image
                                                    src={image.secureUrl}
                                                    alt={image.publicId}
                                                    width={200}
                                                    height={200}
                                                    priority
                                                    className='w-full h-full'
                                                />
                                            </AspectRatio>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <CarouselPrevious
                                    type='button'
                                    aria-label='carousel button previous'
                                    className='left-0'
                                />
                                <CarouselNext type='button' aria-label='carousel button next' className='right-0' />
                            </Carousel>
                        </div>

                        <div className='flex-1 p-4 rounded-md bg-white space-y-2.5'>
                            <h2 className='font-medium text-xl text-cv-gray-200'>{productInfo.name}</h2>
                            <div className='flex items-center h-5 space-x-4 text-sm'>
                                <div className='space-x-1'>
                                    <span className='text-cv-gray-90'>Thương hiệu:</span>
                                    <Link href='' className='text-sm text-cv-primary-100'>
                                        {category.name}
                                    </Link>
                                </div>
                                <Separator orientation='vertical' />
                                <div className='text-cv-gray-90'>Đã bán {productInfo.quantitySold}</div>
                            </div>
                            <div className='font-medium text-lg text-cv-primary-100'>
                                {productInfo.price.toCurrency()}
                            </div>
                        </div>
                    </div>

                    <div className='p-4 rounded-md bg-white'>
                        <h3 className='font-semibold text-lg text-cv-gray-100'>Mô tả chi tiết</h3>
                        <div dangerouslySetInnerHTML={{ __html: productInfo.description }}></div>
                    </div>
                </div>

                <div className='flex-1 relative'>
                    <div className='sticky top-[4.625rem] right-0 h-auto p-4 rounded-md bg-white space-y-3'>
                        <Button size='lg' className='w-full'>
                            Mua ngay
                        </Button>
                        <Button variant='outline' size='lg' className='w-full'>
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export async function generateMetadata({ params: { slug } }: IProps): Promise<Metadata> {
    const result = await getProductBySlug(slug);
    return { title: `${result.info.name} | Laptop Store` };
}
export default ProductDetailPage;
