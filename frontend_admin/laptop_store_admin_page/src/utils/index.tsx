export function logger(label: string, ...args: any[]) {
    const styleRed = 'color: red';
    const styleYellow = 'color: yellow';
    const separateBottom = '<<<---';

    if (args.length === 1) {
        console.log(`%c>>> ${label}`, styleRed, ...args);
        console.log(`%c${separateBottom}`, styleYellow);
    } else {
        console.group(`%c${label}`, styleRed);
        console.log(...args);
        console.groupEnd();
        console.log(`%c${separateBottom}`, styleYellow);
    }
}

export function toCurrency(
    value: number,
    locales: string = 'vi',
    options?: Intl.NumberFormatOptions,
): string {
    const targetOptions = { style: 'currency', currency: 'VND' };
    Object.assign(targetOptions, options);
    return value.toLocaleString(locales, targetOptions);
}

export function formatLocalDate(
    value: string | undefined,
    locales: string = 'vi',
    options?: Intl.DateTimeFormatOptions,
): string {
    if (!value) {
        return '';
    }

    const separate = ' ';
    const date = new Date(value);
    const targetOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    Object.assign(targetOptions, options);
    return date.toLocaleDateString(locales, targetOptions).split(separate).reverse().join(separate);
}

export const fetaos = (function () {
    interface IPathRequestInit extends RequestInit {
        dynamic?: unknown[];
        params?: Record<string, unknown>;
    }
    interface IDataRequestInit extends IPathRequestInit {
        json?: boolean;
        data?: any;
    }

    let _baseURL: string;

    function dynamicToString(dynamic: unknown[] | undefined) {
        const string = dynamic ? dynamic.join('/') : '';
        return string ? '/'.concat(string) : string;
    }
    function joinParam(param: [unknown, unknown]): string {
        return param.join('=');
    }
    function paramsToString(params: Record<string, unknown> | undefined) {
        const string = params ? Object.entries(params).map(joinParam).join('?') : '';
        return string ? '?'.concat(string) : string;
    }

    function createURL(path: string, options: IPathRequestInit): string {
        const newOptions = Object.assign({ dynamic: [], params: {} }, options);
        const dynamicPath = dynamicToString(newOptions.dynamic);
        const paramsPath = paramsToString(newOptions.params);
        return ''.concat(_baseURL, path, dynamicPath, paramsPath);
    }

    async function get(path: string, options: IPathRequestInit = {}) {
        const url = createURL(path, options);
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (reason) {
            throw reason;
        }
    }
    async function post(path: string, options: IDataRequestInit = {}) {
        const url = createURL(path, options);
        options.method = 'POST';

        if (options.json) {
            options.headers = { 'content-type': 'application/json' };
            options.body = JSON.stringify(options.data);
        }

        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (reason) {
            throw reason;
        }
    }
    async function put(path: string, options: IDataRequestInit = {}) {
        const url = createURL(path, options);
        options.method = 'PUT';

        if (options.json) {
            options.headers = { 'content-type': 'application/json' };
            options.body = JSON.stringify(options.data);
        }

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (reason) {
            throw reason;
        }
    }
    async function patch(path: string, options: IDataRequestInit = {}) {
        const url = createURL(path, options);
        options.method = 'PATCH';

        if (options.json) {
            options.headers = { 'content-type': 'application/json' };
            options.body = JSON.stringify(options.data);
        }

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (reason) {
            throw reason;
        }
    }
    async function _delete(path: string, options: IDataRequestInit = {}) {
        const url = createURL(path, options);
        options.method = 'DELETE';

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (reason) {
            throw reason;
        }
    }

    function fetaos(baseURL: string | undefined) {
        _baseURL = baseURL || '';
        return { get, post, put, patch, _delete };
    }
    return fetaos;
})();
