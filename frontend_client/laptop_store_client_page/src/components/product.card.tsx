import '~/libs/extension.number';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '~/libs/utils';
import { IProductInfo } from '~/types/models';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface IProps {
    product: IProductInfo;
    className?: string;
}

function ProductCard({ product, className }: IProps) {
    return (
        <Card className={cn('h-full p-1 rounded-sm shadow-none', className)}>
            <CardHeader className='p-2'>
                <Link href={`/${product.slug}`}>
                    <AspectRatio ratio={1}>
                        <Image
                            src={product.thumbnailUrl}
                            alt={product.name}
                            width={200}
                            height={200}
                            priority
                            className='rounded-t-sm hover:scale-110 transition-transform'
                        />
                    </AspectRatio>
                </Link>
            </CardHeader>
            <CardContent className='p-2'>
                <Link href={`/${product.slug}`}>
                    <CardTitle
                        title={product.name}
                        className='h-12 mb-0.5 text-base text-cv-gray-100 font-normal break-words line-clamp-2'
                    >
                        {product.name}
                    </CardTitle>
                </Link>

                <span className='text-cv-primary-100 font-semibold'>{product.price.toCurrency()}</span>
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
    );
}

export default ProductCard;
