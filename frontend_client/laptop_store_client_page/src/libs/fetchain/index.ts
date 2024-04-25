import core from './core';
import { IFetchain } from './types';

function fetchain(baseURL: string, options: RequestInit = {}): IFetchain {
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    return { ...core, baseURL, options };
}

export { HttpStatus } from './constants';
export { FetchainError } from './types';
export type { FetchainErrorHandler, HttpMethodsType, IFetchain, IFetchainResponse } from './types';
export default fetchain;
