import { z } from 'zod';

const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const fullNameRequired = 'Nhập Họ và tên';
const phoneRequired = 'Nhập số điện thoại';
const provinceRequired = 'Chọn tỉnh/thành';
const districtRequired = 'Chọn quận huyện';
const wardRequired = 'Chọn phường xã';
const zString = (required_error: string) => z.string({ required_error }).trim();

export const loginSchema = z.object({
    email: zString('Nhập email').min(1, 'Nhập email').email('Email không đúng'),
    password: zString('Nhập mật khẩu').min(1, 'Nhập mật khẩu'),
});
export const addressSchema = z.object({
    fullName: zString(fullNameRequired).min(1, fullNameRequired),
    phone: zString(phoneRequired).min(1, phoneRequired).regex(regexPhone, 'Số điện thoại định dạng không đúng'),
    province: zString(provinceRequired),
    district: zString(districtRequired).min(1, districtRequired),
    ward: zString(wardRequired).min(1, wardRequired),
    street: zString(''),
    deliveryAddressType: z.enum(['HOME', 'COMPANY']),
    selectDefault: z.boolean(),
});
