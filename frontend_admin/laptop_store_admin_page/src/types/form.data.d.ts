import { InferType } from 'yup';
import {
    addBrandSchema,
    addProductSchema,
    categorySchema,
    loginSchema,
    registerSchema,
    sendMailSchema,
} from '~/schemas';

export type loginFormData = InferType<typeof loginSchema>;
export type registerFormData = InferType<typeof registerSchema>;
export type sendMailFormData = InferType<typeof sendMailSchema>;
export type addProductFormData = InferType<typeof addProductSchema>;
export type categoryFormData = InferType<typeof categorySchema>;
export type addBrandFormData = InferType<typeof addBrandSchema>;
