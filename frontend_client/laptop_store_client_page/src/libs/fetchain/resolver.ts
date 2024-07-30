import { CONTENT_TYPE_JSON, FETCH_ERROR, HttpStatus } from './constants';
import { FetchainError, IFetchain, IFetchainResponse } from './types';

function resolver(fetchain: IFetchain): IFetchainResponse {
    const { finalURL, options } = fetchain;
    const catchers = new Map(fetchain.catchers);
    const responsePromise = fetch(finalURL, options);
    const resultPromise = responsePromise
        .then((res) => {
            if (res.ok) return res;

            const fetchainError = new FetchainError();
            fetchainError.status = res.status;
            fetchainError.response = res;
            fetchainError.url = finalURL;

            return res.text().then((value) => {
                const headerValue = res.headers.get('content-type');
                if (headerValue && headerValue.includes(CONTENT_TYPE_JSON)) {
                    fetchainError.json = JSON.parse(value);
                }
                throw fetchainError;
            });
        })
        .catch((error) => {
            throw { [FETCH_ERROR]: error };
        });

    const catchWrapper = <T>(promise: Promise<T>) => {
        return promise.catch((reason) => {
            if (reason.hasOwnProperty(FETCH_ERROR)) {
                const error = reason[FETCH_ERROR];
                const catcher = catchers.get(error.status) || catchers.get(FETCH_ERROR);
                if (catcher) {
                    return catcher(error, fetchain);
                }
                throw error;
            } else {
                throw reason;
            }
        });
    };

    type BodyParserHandler = <Type>(
        method: 'json' | null,
    ) => <Result = void>(cb?: (value: Type) => Result) => Promise<Awaited<Result>>;

    const bodyParser: BodyParserHandler = (method) => (cb) =>
        method
            ? catchWrapper(resultPromise.then((res) => res[method]()).then((result) => (cb ? cb(result) : result)))
            : catchWrapper(resultPromise.then((res) => (cb ? cb(res as any) : res)));

    return {
        error(code, callback) {
            catchers.set(code, callback);
            return this;
        },
        badRequest(callback) {
            return this.error(HttpStatus.BAD_REQUEST, callback);
        },
        unauthorized(callback) {
            return this.error(HttpStatus.UNAUTHORIZED, callback);
        },
        forbidden(callback) {
            return this.error(HttpStatus.FORBIDDEN, callback);
        },
        notFound(callback) {
            return this.error(HttpStatus.NOT_FOUND, callback);
        },
        timeout(callback) {
            return this.error(HttpStatus.REQUEST_TIMEOUT, callback);
        },
        internalError(callback) {
            return this.error(HttpStatus.INTERNAL_ERROR, callback);
        },
        fetchError(callback) {
            return this.error(FETCH_ERROR, callback);
        },
        json: bodyParser<any>('json'),
        res: bodyParser<Response>(null),
    };
}

export default resolver;
