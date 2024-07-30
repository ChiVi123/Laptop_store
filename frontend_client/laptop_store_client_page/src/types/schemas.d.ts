import { z } from 'zod';
import { addressSchema, loginSchema } from '~/schemas';

export type loginTypeSchema = z.infer<typeof loginSchema>;
export type addressTypeSchema = z.infer<typeof addressSchema>;
