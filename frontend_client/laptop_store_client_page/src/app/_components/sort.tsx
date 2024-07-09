'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '~/components/ui/badge';

function Sort() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const sort_by = searchParams.get('sort_by') ?? 'created_at';
    const sort_dir = searchParams.get('sort_dir') ?? 'desc';
    const sorts = [
        { value: 'created_at', direct: 'desc', label: 'Mới nhất' },
        { value: 'quantity_stock', direct: 'desc', label: 'Bán chạy' },
        { value: 'price', direct: 'desc', label: 'Giá cao đến thấp' },
        { value: 'price', direct: 'asc', label: 'Giá thấp đến cao' },
    ];

    const handleClick = (value: string, direct: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort_by', value);
        params.set('sort_dir', direct);

        router.push(pathname + '?' + params.toString());
    };

    return (
        <div className='hidden sm:block space-x-2'>
            <span className='text-sm'>Sắp xếp theo:</span>
            {sorts.map((item) => (
                <Badge
                    key={item.value + '-' + item.direct}
                    aria-label={item.value + '-' + item.direct}
                    variant={item.value === sort_by && item.direct === sort_dir ? 'default' : 'outline'}
                    className='text-center cursor-pointer'
                    onClick={() => handleClick(item.value, item.direct)}
                >
                    {item.label}
                </Badge>
            ))}
        </div>
    );
}

export default Sort;
