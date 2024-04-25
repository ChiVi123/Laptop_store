import fetchain from './fetchain';

export const apiRequest = fetchain(process.env.REACT_API_SERVER ?? '');
export * from './helper.request';
export * from './helper.token';
export { default as logger } from './logger';
