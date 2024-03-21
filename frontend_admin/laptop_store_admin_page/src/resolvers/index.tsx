'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    addCategorySchema,
    addProductSchema,
    brandSchema,
    loginSchema,
    registerSchema,
    sendMailSchema,
} from '~/schemas';

export const loginResolver = yupResolver(loginSchema);
export const registerResolver = yupResolver(registerSchema);
export const sendMailResolver = yupResolver(sendMailSchema);
export const addProductResolver = yupResolver(addProductSchema);
export const addCategoryResolver = yupResolver(addCategorySchema);
export const brandResolver = yupResolver(brandSchema);
