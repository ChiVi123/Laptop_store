import { IErrorResponse } from '~/types/response';
import { formatFullUrl, formatPath } from '~/utils';

interface ICustomOptions extends Omit<RequestInit, 'method'> {
    baseUrl?: string;
    auth?: string;
    params?: Record<string, unknown>;
}
type httpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function joinKeyValue(item: [string, unknown]) {
    return item.join('=');
}
function createSearchParams(params: Record<string, unknown> = {}) {
    const entries = Object.entries(params);
    const joinAllParam = entries.map(joinKeyValue).join('&');
    return joinAllParam ? `?${joinAllParam}` : '';
}

export class ErrorResponse extends Error {
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

    public async request<Res>(method: httpMethod, url: string, options?: ICustomOptions) {
        const baseUrl = options?.baseUrl === undefined ? this.baseUrl : options.baseUrl;
        const searchParams = createSearchParams(options?.params);
        const baseHeaders = { ...options?.headers };
        const formatUrl = formatPath(url);
        const fullUrl = formatFullUrl(baseUrl, `${formatUrl}${searchParams}`);

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
            throw new ErrorResponse(response.status, body);
        }
        return body as Res;
    }
}

const instance = new RequestWrap(process.env.REACT_API_SERVER || '');
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
export function stringifyError(error: unknown) {
    if (error instanceof ErrorResponse) return { error: JSON.stringify(error) };
    else return { error: 'Something went wrong!' };
}
