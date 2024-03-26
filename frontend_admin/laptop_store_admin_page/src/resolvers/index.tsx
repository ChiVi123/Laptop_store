'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { brandSchema, categorySchema, loginSchema, productSchema, registerSchema, sendMailSchema } from '~/schemas';

export const loginResolver = yupResolver(loginSchema);
export const registerResolver = yupResolver(registerSchema);
export const sendMailResolver = yupResolver(sendMailSchema);
export const productResolver = yupResolver(productSchema);
export const categoryResolver = yupResolver(categorySchema);
export const brandResolver = yupResolver(brandSchema);
