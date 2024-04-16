import { IErrorResponse } from '~/types/response';
import { formatFullUrl, formatPath } from '~/utils';

type httpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface ICustomOptions extends Omit<RequestInit, 'method'> {
    baseUrl?: string;
    auth?: string;
    params?: Record<string, unknown>;
}
function createSearchParams(params: Record<string, unknown> = {}) {
    const entries = Object.entries(params);
    const joinAllParam = entries.map((item) => item.join('=')).join('&');
    return joinAllParam ? `?${joinAllParam}` : '';
}
export class FetchError extends Error {
    public httpCode: number;
    public body: IErrorResponse;
    public url: string;
    public options: RequestInit;
    constructor(httpCode: number, body: any, url: string, options: RequestInit) {
        super('Fetch error');
        this.httpCode = httpCode;
        this.body = body;
        this.url = url;
        this.options = options;
    }
}
export class ReasonError extends Error {
    public httpCode: number;
    public payload: IErrorResponse;

    constructor(httpCode: number, payload: any) {
        super('Response error');
        this.httpCode = httpCode;
        this.payload = payload;
    }
}
class RequestWrap {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async request<BodyResponse>(method: httpMethod, url: string, options?: ICustomOptions) {
        const baseUrl = options?.baseUrl ?? this.baseUrl;
        const formatUrl = formatPath(url);
        const searchParams = createSearchParams(options?.params);
        const fullUrl = formatFullUrl(baseUrl, `${formatUrl}${searchParams}`);
        const baseHeaders = { ...options?.headers };

        if (options?.auth) {
            Object.assign(baseHeaders, { Authorization: options.auth });
        }
        if (options?.body && !(options.body instanceof FormData)) {
            Object.assign(baseHeaders, { 'content-type': 'application/json' });
            options.body = JSON.stringify(options.body);
        }

        const newOptions = { ...options, headers: { ...baseHeaders, ...options?.headers }, method };
        const response = await fetch(fullUrl, newOptions);
        const body = await response.json();

        if (!response.ok) {
            throw new FetchError(response.status, body, fullUrl, newOptions);
        }

        return body as BodyResponse;
    }
}

const instance = new RequestWrap(process.env.REACT_API_SERVER ?? '');
const httpRequest = {
    async get<Res>(url: string, options?: Omit<ICustomOptions, 'body'>) {
        return await instance.request<Res>('GET', url, options);
    },
    async post<Res>(url: string, body: any, options?: Omit<ICustomOptions, 'body'>) {
        return await instance.request<Res>('POST', url, { ...options, body });
    },
    async put<Res>(url: string, body: any, options?: Omit<ICustomOptions, 'body'>) {
        return await instance.request<Res>('PUT', url, { ...options, body });
    },
    async patch<Res>(url: string, body: any, options?: Omit<ICustomOptions, 'body'>) {
        return await instance.request<Res>('PATCH', url, { ...options, body });
    },
    async delete<Res>(url: string, options?: Omit<ICustomOptions, 'body'>) {
        return await instance.request<Res>('DELETE', url, { ...options });
    },
};

export default httpRequest;
export function handleError(error: unknown) {
    if (error instanceof ReasonError) return { error: JSON.stringify(error) };
    else return { error: 'Something went wrong!' };
}
