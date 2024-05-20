import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().min(1, 'Nhập email').email('Email khong dung'),
    password: z.string().trim().min(1, 'Nhập mật khẩu'),
});
