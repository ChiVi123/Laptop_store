interface IRequestDefault extends RequestInit {
    auth?: string;
    params?: Record<string, unknown>;
}
interface IRequestPayload extends IRequestDefault {
    data?: any;
}

export default class FetchWrap {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get(path: string, options: IRequestDefault = {}) {
        this.setAuth(options);

        const params = this.createSearchParams(options.params || {});
        const url = this.baseUrl.concat(path, params);
        return await fetch(url, options);
    }

    public async post(path: string, options: IRequestPayload = {}) {
        this.setAuth(options);
        this.setBody(options);
        options.method = 'POST';

        const params = this.createSearchParams(options.params || {});
        const url = this.baseUrl.concat(path, params);
        return await fetch(url, options);
    }

    public async put(path: string, options: IRequestPayload = {}) {
        this.setAuth(options);
        this.setBody(options);
        options.method = 'PUT';

        const params = this.createSearchParams(options.params || {});
        const url = this.baseUrl.concat(path, params);
        return await fetch(url, options);
    }

    public async patch(path: string, options: IRequestPayload = {}) {
        this.setAuth(options);
        this.setBody(options);
        options.method = 'PATCH';

        const params = this.createSearchParams(options.params || {});
        const url = this.baseUrl.concat(path, params);
        return await fetch(url, options);
    }

    public async delete(path: string, options: IRequestDefault = {}) {
        this.setAuth(options);
        options.method = 'DELETE';

        const params = this.createSearchParams(options.params || {});
        const url = this.baseUrl.concat(path, params);
        return await fetch(url, options);
    }

    private createSearchParams(params: Record<string, unknown>) {
        return '?'.concat(
            Object.entries(params)
                .map((item) => item.join('='))
                .join('&'),
        );
    }

    private setAuth(options: IRequestDefault) {
        if (options.auth) {
            options.headers = options.headers || {};
            Object.assign(options.headers, { Authorization: options.auth });
        }
    }

    private setBody(options: IRequestPayload) {
        if (options.data instanceof FormData) {
            options.body = options.data;
        } else {
            options.headers = options.headers || {};
            Object.assign(options.headers, { 'content-type': 'application/json' });
            options.body = typeof options.data === 'string' ? options.data : JSON.stringify(options.data);
        }
    }
}
