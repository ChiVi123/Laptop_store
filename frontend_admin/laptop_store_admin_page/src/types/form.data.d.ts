import { InferType } from 'yup';
import { sendMailSchema, loginSchema, registerSchema } from '~/schemas';

export type loginFormData = InferType<typeof loginSchema>;
export type registerFormData = InferType<typeof registerSchema>;
export type sendMailFormData = InferType<typeof sendMailSchema>;
