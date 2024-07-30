import { IErrorBodyResponse } from '~/types/body.response';
import { HttpStatus } from './constants';

type FetchainOptions = RequestInit & { baseURL?: string };

export type HttpMethodsType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type FetchainErrorHandler = (error: FetchainError, originalRequest: IFetchain) => any;

export class FetchainError extends Error {
    public status?: HttpStatus;
    public response?: Response;
    public url?: string;
    public json?: IErrorBodyResponse;
}

export interface IFetchainResponse {
    /**
     * Catches an http response with a specific error code or name and performs a callback.
     *
     * The original request is passed along the error and can be used in order to
     * perform an additional request.
     *
     * ```js
     * fetchain("/resource")
     *   .get()
     *   .unauthorized(async (error, req) => {
     *     // Renew credentials
     *     const token = await fetchain("/renew-token").get().text();
     *     storeToken(token);
     *     // Replay the original request with new credentials
     *     return req.auth(token).get().unauthorized((err) => {
     *       throw err;
     *     }).json();
     *   })
     *   .json()
     *   // The promise chain is preserved as expected
     *   // ".then" will be performed on the result of the original request
     *   // or the replayed one (if a 401 error was thrown)
     *   .then(callback);
     * ```
     *
     * @category Catchers
     */
    error(code: string | number | Symbol, callback: FetchainErrorHandler): this;
    /**
     * Catches a "bad request" (http code 400) and performs a callback.
     *
     * _Syntactic sugar for `error(400, cb)`._
     *
     * @category Catchers
     */
    badRequest(callback: FetchainErrorHandler): this;
    /**
     * Catches an "unauthorized" request (http code 401) and performs a callback.
     *
     * _Syntactic sugar for `error(401, cb)`._
     *
     * @category Catchers
     */
    unauthorized(callback: FetchainErrorHandler): this;
    /**
     * Catches a "forbidden" request (http code 403) and performs a callback.
     *
     * _Syntactic sugar for `error(403, cb)`._
     *
     * @category Catchers
     */
    forbidden(callback: FetchainErrorHandler): this;
    /**
     * Catches a "not found" request (http code 404) and performs a callback.
     *
     * _Syntactic sugar for `error(404, cb)`._
     *
     * @category Catchers
     */
    notFound(callback: FetchainErrorHandler): this;
    /**
     * Catches a "time out" request (http code 408) and performs a callback.
     *
     * _Syntactic sugar for `error(408, cb)`._
     *
     * @category Catchers
     */
    timeout(callback: FetchainErrorHandler): this;
    /**
     * Catches a "internal server error" request (http code 500) and performs a callback.
     *
     * _Syntactic sugar for `error(500, cb)`._
     *
     * @category Catchers
     */
    internalError(callback: FetchainErrorHandler): this;
    /**
     * Catches any error thrown by the fetch function and perform the callback.
     *
     * @category Catchers
     */
    fetchError(callback: FetchainErrorHandler): this;
    /**
     * Read the payload and deserialize it as JSON.
     *
     * ```js
     * fetchain("...").get().json((json) => console.log(Object.keys(json)));
     * ```
     *
     * @category Response Type
     */
    json<Result = unknown>(callback?: (value: any) => Result): Promise<Awaited<Result>>;
    /**
     *
     * The handler for the raw fetch Response.
     * Check the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response) documentation for more details on the Response class.
     *
     * ```js
     * fetchain("...").get().res((response) => console.log(response.url));
     * ```
     *
     * @category Response Type
     */
    res<Result = Response>(callback?: (value: Response) => Result): Promise<Awaited<Result>>;
}
export interface IFetchain {
    baseURL: string;
    finalURL: string;
    options: FetchainOptions;
    catchers: Map<string | number | Symbol, (error: FetchainError, originalRequest: IFetchain) => any>;
    /**
     * Sets the request body with any data.
     *
     * ```js
     * fetchain("...").body("hello").put();
     * ```
     *
     * @category Body Types
     * @param data - The body contents
     */
    body(data: unknown): this;
    headers(header: Record<string, string>): this;
    /**
     * Shortcut to set the "Authorization" header. Only set "Bearer token"
     *
     * ```js
     * fetchain("...").auth("d3JldGNoOnJvY2tz");
     * ```
     *
     * @category Helpers
     * @param value - Header value
     */
    auth(value: string | undefined): this;
    params(query: Record<string, unknown>): this;
    /**
     * Sends the request using the accumulated fetch options.
     *
     * Can be used to replay requests.
     *
     * ```js
     * const reAuthOn401 = fetchain()
     *      .catcher(401, async (error, request) => {
     *          // Renew credentials
     *          const token = await fetchain("/renew-token").get().text();
     *          storeToken(token);
     *          // Replay the original request with new credentials
     *          return request.auth(token).fetch().unauthorized((err) => {
     *              throw err;
     *          }).json();
     *      });
     *
     * reAuthOn401
     *      .get("/resource")
     *      .json() // <- Will only be called for the original promise
     *      .then(callback); // <- Will be called for the original OR the replayed promise result
     * ```
     *
     * @category HTTP
     * @param method - The HTTP method to use
     * @param url - Some url to append
     * @param options - New options.
     */
    request(method: HttpMethodsType, url: string, options?: FetchainOptions): IFetchainResponse;
    /**
     * Recall request.
     *
     * Original `request` (IFetchain) property set previous values. The method recall must use inside callback's catcher.
     *
     * ```js
     *   const result = await fetchain("baseURL")
     *       .auth("token")
     *       .body(data)
     *       .post("path")
     *       .unauthorized(async (_error, request) => {
     *           const accessToken = await fetchain("baseURL").post("refresh token");
     *           return request.auth(accessToken).recall().json();
     *       })
     *       .json();
     * ```
     * @category HTTP
     */
    recall(): IFetchainResponse;
    get(url: string, options?: FetchainOptions): IFetchainResponse;
    post(url: string, options?: FetchainOptions): IFetchainResponse;
    put(url: string, options?: FetchainOptions): IFetchainResponse;
    patch(url: string, options?: FetchainOptions): IFetchainResponse;
    delete(url: string, options?: FetchainOptions): IFetchainResponse;
}
