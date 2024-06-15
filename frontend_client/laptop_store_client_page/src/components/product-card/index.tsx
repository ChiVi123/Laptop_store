import Image from 'next/image';
import Link from 'next/link';

import '~/libs/extension.number';

import { cn } from '~/libs/utils';
import { IProductInfo } from '~/types/models';

import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

import ButtonAddCart from './button.add.cart';

interface IProps {
    product: IProductInfo;
    className?: string;
}

function ProductCard({ product, className }: IProps) {
    return (
        <Card className={cn('h-full p-1 rounded-sm shadow-none border-none md:border-solid', className)}>
            <CardHeader className='p-2'>
                <Link title={product.name} href={`/${product.slug}`}>
                    <AspectRatio ratio={1}>
                        <Image
                            src={product.thumbnailUrl}
                            alt={product.name}
                            width={200}
                            height={200}
                            priority
                            className='w-full h-full rounded-t-sm hover:scale-110 transition-transform'
                        />
                    </AspectRatio>
                </Link>
            </CardHeader>
            <CardContent className='p-2'>
                <Link href={`/${product.slug}`}>
                    <CardTitle
                        title={product.name}
                        className='h-12 mb-0.5 text-base text-cv-gray-100 font-normal break-words line-clamp-3 lg:line-clamp-2'
                    >
                        {product.name}
                    </CardTitle>
                </Link>

                <span className='text-cv-primary-100 font-semibold'>{product.price.toCurrency()}</span>
            </CardContent>
            <CardFooter className='flex justify-center p-2'>
                <ButtonAddCart productId={product.id} />
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
