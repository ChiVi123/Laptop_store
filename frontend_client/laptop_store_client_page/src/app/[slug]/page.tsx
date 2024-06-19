import { HomeIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

import '~/libs/extension.number';

import { CarouselImage } from '~/components/product-detail';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { getProductBySlug } from '~/services';

import style from './style.module.css';

interface IProps {
    params: { slug: string };
}

async function ProductDetailPage({ params: { slug } }: IProps) {
    const productDetail = await getProductBySlug(slug);
    const { info: productInfo, images, attributes } = productDetail;
    const [category] = productDetail.categories;

    return (
        <Fragment>
            <Breadcrumb className='hidden md:block mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/' title='Trang chủ'>
                            <HomeIcon className='w-5 h-5' />
                        </BreadcrumbLink>
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

            <div className='flex gap-2 lg:gap-6'>
                <div className='md:w-[86%] lg:w-[75%] space-y-6 lg:space-y-10'>
                    <div className='md:flex justify-between gap-2 lg:gap-6'>
                        {/* Image */}
                        <div className='md:w-60 lg:w-80 p-2 lg:p-4 rounded-md bg-white'>
                            <CarouselImage alt={productInfo.name} images={images} />
                        </div>

                        {/* Info */}
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

                            <ul>
                                {attributes &&
                                    attributes.map((attribute) => (
                                        <li
                                            key={attribute.id}
                                            className='grid grid-cols-[25%_75%] gap-1 p-1 even:bg-cv-gray-10'
                                        >
                                            <span className='text-cv-gray-90'>{attribute.key}</span>
                                            <span>{attribute.value}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='p-4 rounded-md bg-white'>
                        <h3 className='font-semibold text-lg text-cv-gray-100'>Mô tả chi tiết</h3>
                        <div
                            dangerouslySetInnerHTML={{ __html: productInfo.description }}
                            className={style.description}
                        ></div>
                    </div>
                </div>

                <div className='fixed right-0 bottom-0 left-0 flex-1 md:relative'>
                    <div className='md:sticky top-[4.625rem] right-0 grid grid-cols-2 items-center gap-4 md:block p-2 lg:p-4 rounded-md bg-white md:space-y-3'>
                        <Button type='button' size='lg' className='w-full'>
                            Mua ngay
                        </Button>
                        <Button type='button' variant='outline' size='lg' className='w-full'>
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
