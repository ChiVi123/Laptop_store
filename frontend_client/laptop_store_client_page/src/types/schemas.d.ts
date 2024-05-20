import { z } from 'zod';
import { loginSchema } from '~/schemas';

export type loginTypeSchema = z.infer<typeof loginSchema>;
