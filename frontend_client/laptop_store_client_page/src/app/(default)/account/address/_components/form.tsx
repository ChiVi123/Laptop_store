'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addressServerAction } from '~/actions';

import { AddressRequest } from '~/actions/address';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { useAppSelector } from '~/hooks/redux';
import { decodeJwt } from '~/libs/helper';
import { selectAccountToken } from '~/libs/redux/features';
import { JwtPayload } from '~/libs/utilities';
import { addressSchema } from '~/schemas';
import { getAllDistrictByProvinceId, getAllProvince, getAllWardByDistrictId } from '~/services';
import { IDistrict, IProvince, IWard } from '~/types/ghn.response';
import { IAddress } from '~/types/models';
import { addressTypeSchema } from '~/types/schemas';

type FieldText = {
    name: keyof Pick<addressTypeSchema, 'fullName' | 'phone'>;
    label: string;
    placeholder: string;
};
type FieldSelect = {
    name: keyof Pick<addressTypeSchema, 'province' | 'district' | 'ward'>;
    label: string;
    placeholder: string;
};

class Province implements IProvince {
    ProvinceID: number = 0;
    ProvinceName: string = '';

    constructor();
    constructor(province: IProvince);
    constructor(province?: IProvince) {
        this.ProvinceID = province?.ProvinceID ?? 0;
        this.ProvinceName = province?.ProvinceName ?? '';
    }

    get key(): string {
        return this.ProvinceName;
    }

    get value(): string {
        return this.ProvinceName + ';' + this.ProvinceID;
    }
}

class District implements IDistrict {
    DistrictID: number = 0;
    ProvinceID: number = 0;
    DistrictName: string = '';

    constructor();
    constructor(district: IDistrict);
    constructor(district?: IDistrict) {
        this.DistrictID = district?.DistrictID ?? 0;
        this.ProvinceID = district?.ProvinceID ?? 0;
        this.DistrictName = district?.DistrictName ?? '';
    }

    get key(): string {
        return this.DistrictName;
    }
    get value(): string {
        return this.DistrictName + ';' + this.DistrictID;
    }
}

class Ward implements IWard {
    WardCode: string = '';
    DistrictID: number = 0;
    WardName: string = '';

    constructor();
    constructor(ward: IWard);
    constructor(ward?: IWard) {
        this.WardCode = ward?.WardCode ?? '';
        this.DistrictID = ward?.DistrictID ?? 0;
        this.WardName = ward?.WardName ?? '';
    }

    get key(): string {
        return this.WardName;
    }
    get value(): string {
        return this.WardName + ';' + this.WardCode;
    }
}

type AddressState = {
    province: Province[];
    district: District[];
    ward: Ward[];
};

function FormAddress({ address }: { address?: IAddress }) {
    const form = useForm<addressTypeSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: address?.fullName ?? '',
            phone: address?.phone ?? '',
            province: address ? address.province + ';' + address.provinceId : '',
            district: address ? address.district + ';' + address.districtId : '',
            ward: address ? address.ward + ';' + address.wardId : '',
            street: address?.street ?? '',
            deliveryAddressType: address?.deliveryAddressType ?? 'HOME',
            selectDefault: address?.selectDefault ?? false,
        },
    });
    const [addressState, setAddressState] = useState<AddressState>({ province: [], district: [], ward: [] });
    const router = useRouter();
    const { accessToken } = useAppSelector(selectAccountToken);
    const account = decodeJwt<JwtPayload>(accessToken);

    const fieldTexts: FieldText[] = [
        {
            name: 'fullName',
            label: 'Họ và tên:',
            placeholder: 'Nhập Họ và tên...',
        },
        {
            name: 'phone',
            label: 'Số điện thoại:',
            placeholder: 'Nhập số điện thoại...',
        },
    ];
    const fieldSelects: FieldSelect[] = [
        {
            name: 'province',
            label: 'Tỉnh/Thành phố:',
            placeholder: 'Chọn tỉnh/thành phố',
        },
        {
            name: 'district',
            label: 'Quận huyện:',
            placeholder: 'Chọn Quận/Huyện',
        },
        {
            name: 'ward',
            label: 'Phường xã:',
            placeholder: 'Chọn Phường/Xã',
        },
    ];

    useEffect(() => {
        const controller = new AbortController();

        (async function (signal: AbortSignal) {
            const provinceRes = await getAllProvince(signal);
            if (provinceRes) {
                setAddressState((prev) => ({
                    ...prev,
                    province: provinceRes.data.map((item) => new Province(item)),
                }));
            }

            if (address) {
                const districtRes = await getAllDistrictByProvinceId(String(address.provinceId), signal);
                const wardRes = await getAllWardByDistrictId(String(address.districtId), signal);

                if (districtRes && wardRes) {
                    setAddressState((prev) => ({
                        ...prev,
                        district: districtRes.data.map((item) => new District(item)),
                        ward: wardRes.data.map((item) => new Ward(item)),
                    }));
                }
            }
        })(controller.signal);

        return () => controller.abort();
    }, [address]);

    useEffect(() => {
        const subscription = form.watch(async (value, { name, type }) => {
            if (type === 'change') {
                switch (name) {
                    case 'province':
                        const [, provinceId] = value[name]?.split(';') ?? ['', ''];
                        const districtRes = await getAllDistrictByProvinceId(provinceId);

                        if (districtRes) {
                            setAddressState((prev) => ({
                                ...prev,
                                district: districtRes.data.map((item) => new District(item)),
                                ward: [],
                            }));
                            form.setValue('district', '');
                            form.setValue('ward', '');
                        }
                        break;

                    case 'district':
                        const [, districtId] = value[name]?.split(';') ?? ['', ''];
                        const wardRes = await getAllWardByDistrictId(districtId);

                        if (wardRes) {
                            setAddressState((prev) => ({ ...prev, ward: wardRes.data.map((item) => new Ward(item)) }));
                        }
                        break;

                    default:
                        break;
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const handleOnSubmit: SubmitHandler<addressTypeSchema> = async (data) => {
        const [province, provinceId] = data.province.split(';');
        const [district, districtId] = data.district.split(';');
        const [ward, wardId] = data.ward.split(';');

        const newData: AddressRequest = {
            ...data,
            id: address?.id ?? 0,
            accountId: account.accountId,
            province,
            provinceId: Number(provinceId),
            district,
            districtId: Number(districtId),
            ward,
            wardId: Number(wardId),
        };

        const result = address ? await addressServerAction.update(newData) : await addressServerAction.create(newData);

        if (result.payload) {
            router.push('/account/address');
        } else {
            console.error('form address::', result.message);
            toast.error('Có lỗi xảy ra!!!');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className='w-3/5 space-y-3'>
                {fieldTexts.map((item) => (
                    <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem className='grid grid-cols-[25%_75%] justify-start items-center space-y-0'>
                                <FormLabel className='text-sm text-cv-gray-80'>{item.label}</FormLabel>

                                <FormControl>
                                    <Input type='text' placeholder={item.placeholder} autoComplete='on' {...field} />
                                </FormControl>
                                <FormMessage className='col-start-2 col-span-2 px-3 pt-1' />
                            </FormItem>
                        )}
                    />
                ))}

                {fieldSelects.map((item) => (
                    <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem className='grid grid-cols-[25%_75%] justify-start items-center space-y-0'>
                                <FormLabel className='text-sm text-cv-gray-80'>{item.label}</FormLabel>

                                <FormControl>
                                    <select
                                        className='h-9 w-full whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                        {...field}
                                        value={field.value}
                                        onChange={(event) => field.onChange(event.target.value)}
                                    >
                                        <option value=''>{item.placeholder}</option>
                                        {addressState[item.name] &&
                                            addressState[item.name].map((item) => (
                                                <option key={item.key} value={item.value}>
                                                    {item.key}
                                                </option>
                                            ))}
                                    </select>
                                </FormControl>

                                <FormMessage className='col-start-2 col-span-2 px-3 pt-1' />
                            </FormItem>
                        )}
                    />
                ))}

                <FormField
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-[25%_75%] justify-start items-center space-y-0'>
                            <FormLabel className='text-sm text-cv-gray-80'>Địa chỉ:</FormLabel>

                            <FormControl>
                                <textarea
                                    placeholder='Nhập địa chỉ'
                                    autoComplete='off'
                                    {...field}
                                    rows={5}
                                    className='rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                ></textarea>
                            </FormControl>

                            <FormMessage className='col-start-2 col-span-2 px-3 pt-1' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='deliveryAddressType'
                    render={({ field }) => (
                        <FormItem className='grid grid-cols-[25%_75%] justify-start items-center space-y-0'>
                            <FormLabel className='text-sm text-cv-gray-80'>Địa chỉ:</FormLabel>

                            <FormControl>
                                <RadioGroup
                                    defaultValue={field.value}
                                    className='flex items-center justify-between'
                                    onValueChange={field.onChange}
                                >
                                    <FormItem className='flex items-center gap-2 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='HOME' />
                                        </FormControl>
                                        <FormLabel>Nhà riêng / Chung cư</FormLabel>
                                    </FormItem>

                                    <FormItem className='flex items-center gap-2 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='COMPANY' />
                                        </FormControl>
                                        <FormLabel>Cơ quan / Công ty</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='selectDefault'
                    render={({ field }) => (
                        <FormItem className='flex items-center pl-[25%] gap-1 space-y-0'>
                            <FormControl>
                                <Checkbox
                                    hidden={address && address.selectDefault}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>

                            <FormLabel hidden={address && address.selectDefault} className='text-sm text-cv-gray-80'>
                                Đặt làm địa chỉ mặc định
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <div className='text-right'>
                    <Button type='submit' className='mt-6'>
                        Cập nhật
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default FormAddress;
