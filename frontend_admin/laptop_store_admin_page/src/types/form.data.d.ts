import { InferType } from 'yup';
import { brandSchema, categorySchema, loginSchema, productSchema, registerSchema, sendMailSchema } from '~/schemas';

export type loginFormData = InferType<typeof loginSchema>;
export type registerFormData = InferType<typeof registerSchema>;
export type sendMailFormData = InferType<typeof sendMailSchema>;
export type productFormData = InferType<typeof productSchema>;
export type categoryFormData = InferType<typeof categorySchema>;
export type brandFormData = InferType<typeof brandSchema>;
