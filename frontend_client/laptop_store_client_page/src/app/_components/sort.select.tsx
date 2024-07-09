'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';

function SortSelect() {
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

    const handleChange = (value: string): void => {
        const params = new URLSearchParams(searchParams.toString());
        const [by, direct] = value.split(' ');
        params.set('sort_by', by);
        params.set('sort_dir', direct);

        router.push(pathname + '?' + params.toString());
    };

    return (
        <Select onValueChange={handleChange} defaultValue={sort_by + ' ' + sort_dir}>
            <SelectTrigger className='min-w-16'>
                <SelectValue placeholder='Sắp xếp' />
            </SelectTrigger>
            <SelectContent
                ref={(ref) => {
                    // https://github.com/shadcn-ui/ui/issues/486
                    if (!ref) {
                        return;
                    }
                    ref.ontouchstart = (e) => e.preventDefault();
                }}
            >
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {sorts.map((item) => (
                        <SelectItem key={item.value + ' ' + item.direct} value={item.value + ' ' + item.direct}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SortSelect;
