import FetchWrap from './fetch.wrap';

export * from './format.path';
export { default as logger } from './logger';
export { default as parseError } from './parse.error';
export { default as PathHandler } from './path.handler';
export const request = new FetchWrap(process.env.REACT_API_SERVER || '');
