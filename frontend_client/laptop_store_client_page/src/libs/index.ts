import fetchain from './fetchain';

export const apiRequest = fetchain(process.env.NEXT_PUBLIC_API_SERVER ?? '');
export { default as logger } from './logger';
