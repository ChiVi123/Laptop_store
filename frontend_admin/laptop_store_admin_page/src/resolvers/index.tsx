'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema, loginSchema, registerSchema } from '~/schemas';

export const loginResolver = yupResolver(loginSchema);
export const registerResolver = yupResolver(registerSchema);
export const forgotPasswordResolver = yupResolver(forgotPasswordSchema);
