import { InferType } from 'yup';
import { forgotPasswordSchema, loginSchema, registerSchema } from '~/schemas';

export type TLoginFormData = InferType<typeof loginSchema>;
export type TRegisterFormData = InferType<typeof registerSchema>;
export type TForgotPasswordFormData = InferType<typeof forgotPasswordSchema>;
