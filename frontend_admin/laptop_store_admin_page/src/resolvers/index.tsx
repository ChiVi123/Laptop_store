'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    addBrandSchema,
    addCategorySchema,
    addProductSchema,
    loginSchema,
    registerSchema,
    sendMailSchema,
} from '~/schemas';

export const loginResolver = yupResolver(loginSchema);
export const registerResolver = yupResolver(registerSchema);
export const sendMailResolver = yupResolver(sendMailSchema);
export const addProductResolver = yupResolver(addProductSchema);
export const addCategoryResolver = yupResolver(addCategorySchema);
export const addBrandResolver = yupResolver(addBrandSchema);
