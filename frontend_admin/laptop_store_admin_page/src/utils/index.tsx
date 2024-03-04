import FetchWrap from './fetch.wrap';

export { default as logger } from './logger';

export const request = new FetchWrap(process.env.REACT_API_V1 || '');
