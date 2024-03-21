'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { addProductSchema, brandSchema, categorySchema, loginSchema, registerSchema, sendMailSchema } from '~/schemas';

export const loginResolver = yupResolver(loginSchema);
export const registerResolver = yupResolver(registerSchema);
export const sendMailResolver = yupResolver(sendMailSchema);
export const addProductResolver = yupResolver(addProductSchema);
export const categoryResolver = yupResolver(categorySchema);
export const brandResolver = yupResolver(brandSchema);
