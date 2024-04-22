import fetchain from './fetchain';

export const apiRequest = fetchain(process.env.REACT_API_SERVER ?? '');
export type { JwtType } from './helper.token.types';
