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
        const headersObject = new Headers(this.options.headers);
        const headersArray = Object.entries(headers);
        headersArray.forEach(([key, value]) => {
            headersObject.append(key, value);
        });
        return { ...this, options: { ...this.options, headers: headersObject } };
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
        const urlObject = new URL(url, options.baseURL ?? this.baseURL);
        const base = { ...this, options: { ...this.options, ...options, method } };

        urlObject.search = this.requestParams;
        base.finalURL = urlObject.href;

        console.log('request base::', options.baseURL ?? this.baseURL);
        console.log('request url::', url);
        console.log('request href::', urlObject.href);

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
