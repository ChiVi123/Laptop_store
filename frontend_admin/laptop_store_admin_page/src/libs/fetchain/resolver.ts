import { CONTENT_TYPE_JSON, FETCH_ERROR, HttpStatus } from './constants';
import { FetchainError, IFetchain, IFetchainResponse } from './types';

function resolver(fetchain: IFetchain): IFetchainResponse {
    const { finalURL, options } = fetchain;
    const catchers = new Map(fetchain.catchers);
    const responsePromise = fetch(finalURL, options);
    const resultPromise = responsePromise
        .then((response) => {
            if (!response.ok) {
                const fetchainError = new FetchainError();
                fetchainError.status = response.status;
                fetchainError.response = response;
                fetchainError.url = finalURL;

                return response.text().then((value) => {
                    const headerValue = response.headers.get('content-type');
                    if (headerValue && headerValue.includes(CONTENT_TYPE_JSON)) {
                        fetchainError.json = JSON.parse(value);
                    }
                    throw fetchainError;
                });
            } else {
                return response;
            }
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
        typeName: 'json' | null,
    ) => <Result = void>(cb?: (value: Type) => Result) => Promise<Awaited<Result>>;

    const bodyParser: BodyParserHandler = (typeName) => {
        return (cb) => {
            return typeName
                ? catchWrapper(
                      resultPromise.then((res) => res[typeName]()).then((result) => (cb ? cb(result) : result)),
                  )
                : catchWrapper(resultPromise.then((response) => (cb ? cb(response as any) : response)));
        };
    };
    const responseChain: IFetchainResponse = {
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
    return responseChain;
}

export default resolver;
