import { isClient } from '../utils';
import { CONTENT_TYPE_JSON } from './constants';
import resolver from './resolver';
import { IFetchain } from './types';

const core: IFetchain = {
    baseURL: '',
    finalURL: '',
    requestParams: '',
    options: {},
    catchers: new Map(),
    body(data) {
        if (data instanceof FormData) {
            return { ...this, options: { ...this.options, body: data } };
        } else {
            const headers = new Headers(this.options.headers);
            headers.set('content-type', CONTENT_TYPE_JSON);
            return { ...this, options: { ...this.options, headers, body: JSON.stringify(data) } };
        }
    },
    headers(headers) {
        return { ...this, options: { ...this.options, headers: { ...this.options.headers, ...headers } } };
    },
    auth(value) {
        if (!value) {
            return this;
        }
        const headers = new Headers(this.options.headers);
        headers.set('Authorization', `Bearer ${value}`);
        return { ...this, options: { ...this.options, headers } };
    },
    params(query) {
        const searchParams = new URLSearchParams(query);
        return { ...this, requestParams: searchParams.toString() };
    },
    request(method, url, options = {}) {
        let urlObject: URL;
        const baseUrl = options?.baseURL ?? this.baseURL;

        if (URL.canParse(url, baseUrl)) {
            urlObject = new URL(url, baseUrl);
        } else if (isClient()) {
            urlObject = new URL(url, window.location.origin);
        } else {
            urlObject = new URL(url, globalThis.nextOrigin);
        }
        urlObject.search = this.requestParams;

        const base = { ...this, finalURL: urlObject.href, options: { ...this.options, ...options, method } };
        return resolver(base);
    },
    recall() {
        return resolver(this);
    },
    get(url, options) {
        return this.request('GET', url, options);
    },
    post(url, options) {
        return this.request('POST', url, options);
    },
    put(url, options) {
        return this.request('PUT', url, options);
    },
    patch(url, options) {
        return this.request('PATCH', url, options);
    },
    delete(url, options) {
        return this.request('DELETE', url, options);
    },
};

export default core;
