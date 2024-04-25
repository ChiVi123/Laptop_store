import { CONTENT_TYPE_JSON } from './constants';
import resolver from './resolver';
import { IFetchain } from './types';

const core: IFetchain = {
    baseURL: '',
    finalURL: '',
    options: {},
    catchers: new Map(),
    body(data) {
        if (data instanceof FormData) {
            this.options.body = data;
            return { ...this, options: { ...this.options, body: data } };
        } else {
            return {
                ...this,
                options: {
                    ...this.options,
                    headers: { ...this.options.headers, 'content-type': CONTENT_TYPE_JSON },
                    body: JSON.stringify(data),
                },
            };
        }
    },
    headers(header) {
        this.options.headers ??= {};
        return { ...this, options: { ...this.options, headers: { ...this.options.headers, ...header } } };
    },
    auth(value) {
        return value ? this.headers({ Authorization: `Bearer ${value}` }) : { ...this };
    },
    params(query) {
        const requestParams = Object.entries(query)
            .map((item) => item.join('='))
            .join('&');
        return { ...this, finalURL: `?${requestParams}` };
    },
    request(method, url, options = {}) {
        const baseURL = options.baseURL ?? this.baseURL;
        const base = { ...this, options: { ...this.options, ...options, method } };

        url = base.finalURL.startsWith('?') ? `${url}${base.finalURL}` : url;
        base.finalURL = url.startsWith('/') ? baseURL.concat(url) : baseURL.concat('/', url);

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
