import { InferType } from 'yup';
import {
    addCategorySchema,
    addProductSchema,
    brandSchema,
    loginSchema,
    registerSchema,
    sendMailSchema,
} from '~/schemas';

export type loginFormData = InferType<typeof loginSchema>;
export type registerFormData = InferType<typeof registerSchema>;
export type sendMailFormData = InferType<typeof sendMailSchema>;
export type addProductFormData = InferType<typeof addProductSchema>;
export type addCategoryFormData = InferType<typeof addCategorySchema>;
export type brandFormData = InferType<typeof brandSchema>;
